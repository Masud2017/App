import {Str} from 'expensify-common';
import React from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import Button from '@components/Button';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import RenderHTML from '@components/RenderHTML';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import usePermissions from '@hooks/usePermissions';
import useThemeStyles from '@hooks/useThemeStyles';
import Parser from '@libs/Parser';
import Navigation from '@navigation/Navigation';
import * as Card from '@userActions/Card';
import * as CompanyCards from '@userActions/CompanyCards';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';

type CardInstructionsStepProps = {
    policyID: string;
};
function CardInstructionsStep({policyID}: CardInstructionsStepProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const {isOffline} = useNetwork();
    const {canUseDirectFeeds} = usePermissions();

    const [addNewCard] = useOnyx(ONYXKEYS.ADD_NEW_COMPANY_CARD);

    const data = addNewCard?.data;
    const feedProvider = data?.cardType;
    const isStripeFeedProvider = feedProvider === CONST.COMPANY_CARDS.CARD_TYPE.STRIPE;

    const buttonTranslation = isStripeFeedProvider ? translate('common.submit') : translate('common.next');

    const submit = () => {
        if (canUseDirectFeeds && isStripeFeedProvider) {
            Card.updateSelectedFeed(feedProvider, policyID);
            Navigation.goBack();
            return;
        }
        CompanyCards.setAddNewCompanyCardStepAndData({
            step: feedProvider === CONST.COMPANY_CARDS.CARD_TYPE.AMEX ? CONST.COMPANY_CARDS.STEP.CARD_DETAILS : CONST.COMPANY_CARDS.STEP.CARD_NAME,
        });
    };

    const handleBackButtonPress = () => {
        CompanyCards.setAddNewCompanyCardStepAndData({step: isStripeFeedProvider ? CONST.COMPANY_CARDS.STEP.SELECT_BANK : CONST.COMPANY_CARDS.STEP.CARD_TYPE});
    };

    return (
        <ScreenWrapper
            testID={CardInstructionsStep.displayName}
            includeSafeAreaPaddingBottom={false}
            shouldEnablePickerAvoiding={false}
            shouldEnableMaxHeight
        >
            <HeaderWithBackButton
                title={translate('workspace.companyCards.addCardFeed')}
                onBackButtonPress={handleBackButtonPress}
            />
            <ScrollView
                style={styles.pt0}
                contentContainerStyle={styles.flexGrow1}
            >
                <Text style={[styles.textHeadlineLineHeightXXL, styles.ph5, styles.mv3]}>
                    {translate('workspace.companyCards.addNewCard.enableFeed.title', {provider: Str.recapitalize(feedProvider ?? '')})}
                </Text>
                <Text style={[styles.ph5, styles.mb3]}>{translate('workspace.companyCards.addNewCard.enableFeed.heading')}</Text>
                <View style={[styles.ph5]}>
                    <RenderHTML html={Parser.replace(feedProvider ? translate(`workspace.companyCards.addNewCard.enableFeed.${feedProvider}`) : '')} />
                </View>
                <View style={[styles.mh5, styles.pb5, styles.mt3, styles.flexGrow1, styles.justifyContentEnd]}>
                    <Button
                        isDisabled={isOffline}
                        success
                        large
                        style={[styles.w100]}
                        onPress={submit}
                        text={buttonTranslation}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

CardInstructionsStep.displayName = 'CardInstructionsStep';

export default CardInstructionsStep;
