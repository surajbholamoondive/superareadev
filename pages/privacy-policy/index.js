import React from 'react';
import Styles from './index.module.css';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const { privacyPolicyText } = GLOBALLY_COMMON_TEXT.text;
import { staticPagesText } from '@/content/Privacy';
const { privacyPolicy } = staticPagesText;

const Index = () => {
    return (
        <div className={`${Styles.wrapper} bg-newBackground`}>

            <div className={Styles.contentWrapper}>
                

                <div className={Styles.contentBox}>
                    
                    <h1 className='flex justify-center text-3xl  mb-4 '>{privacyPolicy.Privacy} {privacyPolicy.Policy}</h1>
                    <h3>{privacyPolicy.general}</h3>
                    <p>
                        {privacyPolicy.generalConditions}
                        
                    </p>
                    <h3>{privacyPolicy.spanText}</h3>
                    <p>
                        {privacyPolicy.termsBeforeText} “{privacyPolicy.termsBetweenText}”
                        {privacyPolicy.termsAfterText}
                    </p>


                    <h3>{privacyPolicy.companyInfoHeader}</h3>
                    <p>{privacyPolicy.companyInfoText}</p>

                    <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                        <li>{privacyPolicy.companyInfoBeforeText}</li>
                        <br/>
                        <li>{privacyPolicy.companyInfoAfterText}</li>
                        <br/>
                        <p>{privacyPolicy.companyInfoAfterText2}</p>
                    </ol>


                    <p>{privacyPolicy.accessText}</p>
                    <p>{privacyPolicy.accessTouchText}</p>


                    <h3>{privacyPolicy.updatingPersonalHeader}</h3>
                    <p>{privacyPolicy.updatingPersonalText}</p>
                    <ul className="list-disc pl-6">
                        <li>{privacyPolicy.personal}</li>
                        <li>{privacyPolicy.personal1}</li>
                        <li>{privacyPolicy.personal2}</li>
                        <li>{privacyPolicy.personal3}</li>
                        <li>{privacyPolicy.personal4}</li>
                        <li>{privacyPolicy.personal5}</li>
                        <li>{privacyPolicy.personal6}</li>
                        <li>{privacyPolicy.personal7}</li>
                        <li>{privacyPolicy.personal8}</li>
                    </ul>



                    <h3>{privacyPolicy.cookies}</h3>
                    <p>
                        {privacyPolicy.cookiesPolicyText}
                        
                    </p>
                    <h3>{privacyPolicy.cookieTypesText}</h3>
                    <p>
                        {privacyPolicy.essentialCookies}
                    </p>

                    <h3>{privacyPolicy.SharingandDisclosurе}</h3>
                    <p>{privacyPolicy.cookiesMaintainingText}</p>
                     <ul className="list-disc pl-6">
                        <li>{privacyPolicy.SharingandDisclosurе1}</li>
                        <br/>
                        <li>{privacyPolicy.SharingandDisclosurе2}</li>
                        <br/>
                        <li>{privacyPolicy.SharingandDisclosurе3}</li>
                        <br/>
                    </ul>
                    <p>{privacyPolicy.SharingandDisclosurе4}</p>

                    <h3>{privacyPolicy.DataSеcurity}</h3>
                    <p>{privacyPolicy.DataSеcurityText}</p>
                    <h3>{privacyPolicy.DataRеtеntion}</h3>
                    <p>{privacyPolicy.DataDataRеtеntionText}</p>
                    <h3>{privacyPolicy.YourRights}</h3>
                    <p>{privacyPolicy.YourRightsText}</p>
                    <ul className="list-disc pl-6">
                        <li>{privacyPolicy.YourRightsText1}</li>
                        <br/>
                        <li>{privacyPolicy.YourRightsText2}</li>
                        <br/>
                        <li>{privacyPolicy.YourRightsText3}</li>
                        <br/>
                        <li>{privacyPolicy.YourRightsText4}</li>
                        <br/>
                        <p>{privacyPolicy.YourRightsText5}</p>
                    </ul>
                    <h3>{privacyPolicy.ChildrеnPrivacy}</h3>
                    <p>{privacyPolicy.ChildrеnPrivacyText}</p>

                    <h3>{privacyPolicy.ChangеstoThisPolicy}</h3>
                    <p>{privacyPolicy.Policy1}</p>  
                    <p>{privacyPolicy.Policy2}</p>
                    <h3>{privacyPolicy.ContactandGriеvancеRеdrеssal}</h3>
                    <p><b>{privacyPolicy.GriеvancеOfficеr}</b></p>
                    <p><b>{privacyPolicy.Email}</b></p>
                    <p><b>{privacyPolicy.PostalAddrеss}</b></p>

                    <p>{privacyPolicy.bottom}</p>


                    
                </div>
            </div>
        </div>
    );
};

export default Index;
