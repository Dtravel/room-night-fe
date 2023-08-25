import LayoutHome from '@dtravel/components/layout/LayoutHome'
import type { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  userAgent?: string
}

const TearmsAndConditions: NextPage<Props> = () => (
  <>
    <LayoutHome title="Dtravel Terms and Conditions" description="Dtravel Terms and Conditions">
      <div className="privacyPolicy max-w-screen-xl m-auto py-20 px-[16px] md:px-10 lg:px-[40px] font-maison-neue-light">
        <h1 className={'mb-4'}>Dtravel Terms and Conditions</h1> <time>Last updated: 21 June 2022</time> <br />
        <br />
        <p>
          <span>These Terms and Conditions (the “</span>
          <strong>Terms</strong>
          <span>”) govern the legally binding relationship between you and Newstart Services (“</span>
          <strong>us</strong>
          <span>”, “</span>
          <strong>we</strong>
          <span>”, “</span>
          <strong>our</strong>
          <span>
            ”) when you use dtravel.com, a subdomain of dtravel.com, or any other website operated by us where these
            Terms are displayed or linked (collectively the “
          </span>
          <strong>Dtravel Platform</strong>
          <span>
            ”). By using the Dtravel Platform, you acknowledge that you understand these Terms, as well as our{' '}
          </span>
          <Link href="/privacy-policy" passHref>
            <span>Privacy & Cookie Policy</span>
          </Link>
          <span>, and agree to be legally bound by them.</span>
        </p>
        <br />
        <p>
          <span>The Dtravel Platform enables you to do the following: list properties for short-term rental (“</span>
          <strong>Accommodation</strong>
          <span>”) as a “</span>
          <strong>Host</strong>
          <span>”; and browse and reserve Accommodation as a “</span>
          <strong>Guest</strong>
          <span>
            ”. The Dtravel Platform facilitates a peer-to-peer service that connects Hosts and Guests. While we endeavor
            to ensure that all Accommodation advertised on the Dtravel Platform is suitable and complies with these
            Terms, we do not manage or control any Accommodation, nor are we a party to any contracts, in the capacity
            of an agent or otherwise, entered into between Hosts and Guests as a result of reservations made on the
            Dtravel Platform.
          </span>
        </p>
        <br />
        <p>
          <strong>Definitions</strong>
        </p>
        <br />
        <p>
          <strong>Accommodation </strong>
          <span>
            means any property owned or legally managed by a Host which is listed on the Dtravel Platform and
            subsequently reserved by a Guest in accordance with these Terms;
          </span>
        </p>
        <br />
        <p>
          <strong>Dtravel Platform </strong>
          <span>
            means dtravel.com, a subdomain of dtravel.com, or any other website operated by us where these Terms are
            displayed or linked;
          </span>
        </p>
        <br />
        <p>
          <strong>Force Majeure</strong>
          <span>
            {' '}
            includes but is not limited to factual, technical, political, economic, meteorological circumstances,
            including but not limited to acts of God, natural disasters, epidemics, pandemics, public health
            emergencies, wars, terrorism, civil conflicts, protests, riots, blackouts, strikes, any governmental or
            regulatory action, outage or restrictions of supplies of goods or services, restrictive travel orders and
            recommendations, changes to visa or passport requirements, and other circumstances that cannot be reasonably
            foreseen or resolved;
          </span>
        </p>
        <br />
        <p>
          <strong>Guest </strong>
          <span>
            means any individual who reserves an Accommodation on the Dtravel Platform and includes any visitor invited
            to be physically present at the Accommodation;
          </span>
        </p>
        <br />
        <p>
          <strong>Host </strong>
          <span>means any individual or entity that lists Accommodation on the Dtravel Platform; and</span>
        </p>
        <br />
        <p>
          <strong>Stay </strong>
          <span>
            means the period on and between the check-in date and the check-out date of a Guest taking up lodging at an
            Accommodation reserved on the Dtravel Platform.
          </span>
        </p>
        <br />
        <p>
          <strong style={{ fontSize: '36px' }}>Guest Terms</strong>
        </p>
        <br />
        <p>
          <span>In this section, references to “</span>
          <strong>you</strong>
          <span>” or “</span>
          <strong>your</strong>
          <span>” means a Guest.</span>
        </p>
        <br />
        <ol>
          <h2>
            <strong> 1. Reservations</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            1.1 You may reserve an Accommodation as a Guest by paying the price specified on each Accommodation for your
            relevant Stay duration and dates, including any fees (the “
          </span>
          <strong>Reservation Price</strong>
          <span>”).</span>
        </p>
        <br />
        <p>
          <span>1.2 By making a reservation, you represent and warrant that:</span>
        </p>
        <br />
        <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '4rem' }}>
          <li>
            <span>you are at least eighteen (18) years of age;</span>
          </li>
          <li>
            <span>you have the full right, legal capacity, and authority to agree to these Terms;</span>
          </li>
          <li>
            <span>
              you are not a resident, or tax resident of, and do not otherwise have any relevant connection with, any
              jurisdiction in which entry into or performing your obligations under these Terms is unlawful or
              restricted in any way or requires licensing, registration or approval of any kind; and
            </span>
          </li>
          <li>
            <span>
              you are compliant with the applicable law to which you are subject in your respective jurisdiction and
              will not participate under these Terms if any applicable law in your country prohibits you from doing so
              in accordance with these Terms.
            </span>
          </li>
        </ol>
        <br />
        <p>
          <span>
            1.3 You acknowledge that a reservation permits you to lodge at an Accommodation for the duration of a Stay
            and agree to abide by the terms specific to the Accommodation, including to not exceed the maximum number of
            Guests and to follow any rules and/or restrictions set by the Host. During a Stay, the Host reserves the
            right to enter the Accommodation if it is reasonably necessary and permissible under applicable law.
          </span>
        </p>
        <br />
        <p>
          <span>
            1.4 You acknowledge that any payments of the Reservation Price that you make are facilitated by third-party
            blockchain systems (in the case of cryptocurrency payments) or third-party payment processors (in the case
            of fiat currency payments). Dtravel does not, at any point in time, have custody of or access to control the
            Reservation Price or any other payments. Any payments made by you are paid directly to a Host. You also
            acknowledge that the payment of any cryptocurrency network fees or credit card surcharges are your sole
            responsibility.
          </span>
        </p>
        <br />
        <p>
          <span>
            1.5 Subject to clause 9.4 of these Terms, you shall be solely liable to the Host for any damage or loss you
            cause in an accommodation during a Stay.&nbsp;
          </span>
        </p>
        <br />
        <ol start={2}>
          <h2>
            <strong> 2. Cancellations, Refunds and Changes</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            2.1 When you cancel a reservation prior to check-in, the Host’s cancellation policy will determine whether
            you are entitled to receive a refund and, if so, the amount of the Reservation Price refundable to you shall
            be subject to the Host’s cancellation policy.
          </span>
        </p>
        <br />
        <p>
          <span>
            2.2 Where you cancel or are otherwise unable to attend a reservation due to a Force Majeure event, you may
            be entitled to receive a partial or full refund of your Reservation Price regardless of the Host’s
            cancellation policy, as determined by the Host on a case-by-case basis.
          </span>
        </p>
        <br />
        <p>
          <span>
            2.3 Where a Host cancels a reservation, you may be entitled to receive a partial or full refund of your
            Reservation Price, depending on the Host’s cancellation policy and rules.
          </span>
        </p>
        <br />
        <p>
          <span>
            2.4 Where you request to make changes to a reservation, you acknowledge that the fulfillment of such changes
            is at the sole discretion of the Host and that the Host reserves the right to charge an additional fee to
            fulfill such changes.
          </span>
        </p>
        <br />
        <p>
          <span>
            2.5 You further acknowledge and agree that any Reservation Price rightfully refundable to you shall be
            refunded directly to you by the Host and we shall not in any circumstance be liable to you for any refund of
            the Reservation Price. Any action or claim for a refund sum shall be taken up by you directly with the Host.
          </span>
        </p>
        <br />
        <p>
          <strong style={{ fontSize: '36px' }}>Host Terms</strong>
        </p>
        <br />
        <p>
          <span>In this section, references to “</span>
          <strong>you</strong>
          <span>” or “</span>
          <strong>your</strong>
          <span>” means a Host.</span>
        </p>
        <br />
        <ol start={3}>
          <h2>
            <strong> 3. Connecting to Dtravel</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            3.1 As a Host, you may list Accommodation on the Dtravel Platform by connecting to the Dtravel
            Platform:&nbsp;
          </span>
        </p>
        <br />
        <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '4rem' }}>
          <li>
            <span>a supported cryptographic non-custodial wallet; and subsequently</span>
          </li>
          <li>
            <span>a supported property management system (“</span>
            <strong>PMS Partner</strong>
            <span>”) account.</span>
          </li>
        </ol>
        <br />
        <p>
          <span>3.2 By connecting to the Dtravel Platform, you represent and warrant that:</span>
        </p>
        <br />
        <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '4rem' }}>
          <li>
            <span>you are at least eighteen (18) years of age;</span>
          </li>
          <li>
            <span>you have the full right, legal capacity, and authority to agree to these Terms;</span>
          </li>
          <li>
            <span>
              you are not a resident, or tax resident of, and do not otherwise have any relevant connection with, any
              jurisdiction in which entry into or performing your obligations under these Terms is unlawful or
              restricted in any way;&nbsp;
            </span>
          </li>
          <li>
            <span>
              you do not violate any short-term rental or zoning laws and/or regulations and you represent to us that,
              if your Accommodation is located in an area that requires specific permits, registration and/or licenses,
              you have acquired all such applicable approvals to legally provide short-term rentals and agree to display
              all relevant information (including the license number) about such approvals in your Accommodation
              description; and
            </span>
          </li>
          <li>
            <span>
              you are compliant with the applicable law to which you are subject in your respective jurisdiction and
              will not participate under these Terms if any applicable law in your jurisdiction prohibits you from doing
              so in accordance with these Terms.
            </span>
          </li>
        </ol>
        <br />
        <ol start={4}>
          <h2>
            <strong>4. Managing Accommodation Listings</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            4.1 When listing your Accommodation, you may set the availability of the Accommodation, the price per night
            of the Accommodation, the cancellation policy and any rules that Guests must comply with during their Stay
            at the Accommodation via the PMS Partner.
          </span>
        </p>
        <br />
        <p>
          <span>
            4.2 Upon deploying a listing for an Accommodation, a smart contract on the BNB Smart Chain is generated for
            that Accommodation which is linked to your connected cryptographic non-custodial wallet. This smart contract
            enables you to accept cryptocurrency bookings in a decentralized manner using blockchain technology. You
            acknowledge that the reliability of the smart contract depends on the reliability of the BNB Smart Chain
            network, and that Dtravel is not liable for any losses, whether consequential or indirect, that arise as a
            result of the inadequateness or failure of the BNB Smart Chain Network, or as a result of your failure to
            ensure that your non-custodial cryptographic wallet is perpetually accessible by you, secure, or properly
            connected.
          </span>
        </p>
        <br />
        <p>
          <span>
            4.3 You acknowledge that any payments of the Reservation Price made to you by a Guest are facilitated by
            third-party blockchain systems (in the case of cryptocurrency payments) or third-party payment processors
            (in the case of fiat currency payments). Dtravel does not, at any point in time, have custody of or access
            to control the Reservation Price or any other payments due to you.
          </span>
        </p>
        <br />
        <p>
          <span>
            4.4 When you accept a reservation, you agree to the applicable prevailing Dtravel Platform fees being
            deducted from the Reservation Price. The current prevailing Dtravel Platform fee is 5% of the Reservation
            Price. Notwithstanding the foregoing, we retain the right to vary (increase or decrease) the Dtravel
            Platform fees at any point of time with or without notice to you.
          </span>
        </p>
        <br />
        <p>
          <span>
            4.5 When a Guest reserves your Accommodation, you may choose to accept or decline their reservation. If you
            accept, you acknowledge that you enter into a contract with the Guest and agree to provide your
            Accommodation to the Guest for the duration of their Stay on the terms set out in your Accommodation
            listing.
          </span>
        </p>
        <br />
        <p>
          <span>
            4.6 It is your responsibility to ensure that the description of your Accommodation is accurate and does not
            mislead Guests, and that your Accommodation is clean and appropriate for lodging. Any reports or complaints
            of non-compliance with the aforementioned warranty shall be rectified by you as soon as it is reported to
            you.
          </span>
        </p>
        <br />
        <p>
          <span>
            4.7 Subject to clause 9.4 of these Terms, you as the Host shall be solely responsible to claim from a Guest
            any loss or damage suffered by you which is caused by a Guest to or within the Accommodation during a Stay.
            Further, you shall be solely and fully liable for any loss, damage, injury and/or death suffered by the
            Guest or any person the Guest may bring onto the Accommodation during a Stay which is due to your negligence
            or breach of these Terms.
          </span>
        </p>
        <br />
        <ol start={5}>
          <h2>
            <strong> 5. Cancellations, Refunds and Changes</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            5.1 When a Guest cancels a reservation, the amount of the Reservation Price to which you are entitled to (if
            any) will be determined by your applicable cancellation policy.
          </span>
        </p>
        <br />
        <p>
          <span>
            5.2 You should only cancel a Guest’s reservation if you have a valid reason under applicable law or if a
            Force Majeure event occurs. If you cancel a Guest’s reservation, the amount of the Reservation Price that
            you will receive will be reduced by the amount payable to the Guest as well as any fees that may be incurred
            by us arising out of your cancellation.
          </span>
        </p>
        <br />
        <p>
          <span>
            5.3 You represent and warrant to make payment of any applicable refunds to the Guest in accordance with the
            refund terms/policy selected when listing your Accommodation.
          </span>
        </p>
        <br />
        <ol start={6}>
          <h2>
            <strong> 6. Legal and Other Considerations</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            6.1 By listing an Accommodation on the Dtravel Platform, you warrant that you have the requisite legal
            capacity to enter into and be bound by these Terms and, where you are acting on behalf of a legal entity,
            you represent and warrant that you have the authority to legally bind that legal entity to these Terms.
          </span>
        </p>
        <br />
        <p>
          <span>
            6.2 You agree that, as the Host, it is your responsibility to ensure that you comply with applicable laws
            and regulations, as well as the terms of any contracts which you may have with third parties that may affect
            the legality of listing your Accommodation on the Dtravel Platform (such as landlords or lessors) which may
            limit or prohibit subletting or renting your Accommodation.
          </span>
        </p>
        <br />
        <p>
          <span>
            6.3 You acknowledge that you will be solely responsible for any acts or omissions you take or fail to take
            in connection with a Guest’s Stay at your Accommodation. You further acknowledge that it is your sole
            responsibility to appropriately set the terms of your Accommodation listing, including the price,
            availability, and rules of the listing.
          </span>
        </p>
        <br />
        <p>
          <span>
            6.4 You acknowledge that, by using any part of the Dtravel Platform (including, without limitation, to list
            your Accommodation or accept a reservation), no joint venture, partnership, employment, or agency
            relationship of any kind is created with us or arises as a result of your use of the Dtravel Platform.
          </span>
        </p>
        <br />
        <p>
          <span>
            6.5 We strongly recommend you to obtain the required insurance that would adequately cover any loss or
            damage to your Accommodation in the event that a Guest causes damage to your Accommodation or you incur
            liability to a Guest in the event of their injury or death during their Stay at your Accommodation.
          </span>
        </p>
        <br />
        <p>
          <span>
            6.6 Any and all obligations that you have to report, remit, or collect any taxes, or to display such taxes
            on your listing, are your sole responsibility. Where applicable law requires us to collect or report tax
            information in relation to your use of the Dtravel Platform, we reserve the right to request documentation
            from you to fulfill any such requirement.
          </span>
        </p>
        <br />
        <p>
          <strong style={{ fontSize: '36px' }}>General Terms</strong>
        </p>
        <br />
        <ol start={7}>
          <h2>
            <strong> 7. Acceptable Use</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>7.1 In using the Dtravel Platform, you agree and warrant that you:</span>
        </p>
        <br />
        <p>
          <span>
            (i) will use the Dtravel Platform strictly for personal and non-commercial purposes only (except in the case
            of Hosts) and you acknowledge that use of the Dtravel Platform for any other purpose is prohibited;
          </span>
        </p>
        <br />
        <p>
          <span>
            (ii) will not gather, extract, reproduce and/or display on any other website or other online service, any
            material on or from the Dtravel Platform, specifically including information relating to Accommodation
            pricing and availability, whether using robots, spiders, or other &quot;screen scraping&quot; software or
            system used to extract data;
          </span>
        </p>
        <br />
        <p>
          <span>
            (iii) will not use the Dtravel Platform to provide reservations or details of Accommodation pricing and
            availability or other information to any other persons or organizations, other than for your personal and
            non-commercial use;
          </span>
        </p>
        <br />
        <p>
          <span>
            (iv) will not use the Dtravel Platform for any purpose that is either unlawful or not allowed under these
            Terms.
          </span>
        </p>
        <br />
        <p>
          <span>
            (v) will not commit any act that would constitute a breach of either the privacy (including uploading
            private or personal information without an individual’s consent) or any other of the legal rights of
            individuals;
          </span>
        </p>
        <br />
        <p>
          <span>(vi) will not use the Dtravel Platform while impersonating another person;</span>
        </p>
        <br />
        <p>
          <span>
            (vii) will not use the Dtravel Platform to defame or libel us, our employees or other individuals;
          </span>
        </p>
        <br />
        <p>
          <span>
            (viii) will not transmit any viruses, Trojan horses, worms, or other items that may cause damage to our
            property or the property of other individuals;
          </span>
        </p>
        <br />
        <p>
          <span>
            (ix) will not post or transmit to the Dtravel Platform any non-authorised material including, but not
            limited to, material that is, in our opinion, likely to cause annoyance, or which is defamatory, racist,
            obscene, threatening, pornographic or otherwise, or which is detrimental to or in violation of our systems
            or a third party’s systems or network security;
          </span>
        </p>
        <br />
        <p>
          <span>
            (x) will not tamper with, hinder the operation of, or make unauthorized modifications to the Dtravel
            Platform (including deleting data from the Dtravel Platform without our permission);
          </span>
        </p>
        <br />
        <p>
          <span>
            (xi) will not breach any third party’s rights (including intellectual property rights and obligations of
            confidentiality owed to third parties) or infringe any laws in any jurisdiction in using the Dtravel
            Platform; and
          </span>
        </p>
        <br />
        <p>
          <span>
            (xii) will not attempt to gain unauthorized access to the Dtravel Platform, user accounts, cryptographic
            wallets or computer networks or systems connected to the Dtravel Platform through hacking, password mining,
            or any other means.
          </span>
        </p>
        <br />
        <p>
          <span>
            7.2 You must be at least 18 years of age (or the legal minimum age in countries where the legal minimum age
            is greater than 18) to use the Dtravel Platform. By entering into this agreement, you confirm that you
            possess the legal authority and necessary minimum age to use the Dtravel Platform in accordance with these
            Terms. We will not compensate you or anyone else for any expenses incurred as a result of minors using the
            Dtravel Platform, including any reservations made by minors.
          </span>
        </p>
        <br />
        <p>
          <span>
            7.3 Unless otherwise indicated, we own, or license from third parties, all rights, title, and interest
            (including, without limitation, copyright, designs, patents, trademarks and other intellectual property
            rights) contained on the Dtravel Platform and in all of the material (including, without limitation, all
            text, graphics, logos, audio and software) made available on the Dtravel Platform (“
          </span>
          <strong>Content</strong>
          <span>
            ”). Your use of the Dtravel Platform and use of and access to any Content does not grant or transfer any
            rights, title, or interest to you in relation to the Dtravel Platform or the Content. However, we do grant
            you a license to access the Dtravel Platform and view the Content on the terms and conditions set out in
            these Terms and, where applicable, as expressly authorized by us and/or our third party licensors. All other
            use, copying, reproduction or redistribution of the Dtravel Platform, the Content, or any part of the
            Dtravel Platform or Content is prohibited, except to the extent permitted by law. In addition, you must not
            copy the Content to any other server, location or support for publication, reproduction, or distribution is
            expressly prohibited.&nbsp;
          </span>
        </p>
        <br />
        <p>
          <span>
            7.4 We will determine whether there has been a breach of these Terms through your use of the Dtravel
            Platform. If a breach of this Policy has occurred, we may take such action as we deem appropriate, including
            denying you access to the Dtravel Platform, bringing legal proceedings against you, or disclosing such
            information to law enforcement authorities as we deem appropriate.
          </span>
        </p>
        <br />
        <p>
          <span>
            7.5 Our Dtravel Platform may contain links to other websites operated by third parties. Those links are
            provided for convenience and may not remain current or be maintained. We are not liable to you if
            interference with or damage to your computer systems occurs in connection with the use of the Dtravel
            Platform or any linked website. You must take your own precautions to ensure that whatever you select for
            your use from our Dtravel Platform is free of viruses or any other malware that may interfere with or damage
            the operations of your computer systems.
          </span>
        </p>
        <br />
        <p>
          <span>
            7.6 If we allow you to post any information to the Dtravel Platform, we have the right to take down this
            information at our sole discretion and without notice.
          </span>
        </p>
        <br />
        <p>
          <span>
            7.7 By using the Dtravel Platform, or by entering into correspondence with us through email, social media,
            telephone, or other communication tools, you agree that we may communicate with you through methods
            including, but not limited to, email, social media, messaging applications, telephone and in-app
            notifications. If you wish to unsubscribe from marketing emails, please click ‘Unsubscribe’ at the footer of
            any of our marketing emails or email us at{' '}
          </span>
          <a href="mailto:dpo@dtravel.com">
            <span>dpo@dtravel.com</span>
          </a>
          <span>
            . Please note that, if you unsubscribe from our marketing emails, you will still receive non-marketing
            emails from us (including emails relating to any reservations that you place).
          </span>
        </p>
        <br />
        <ol start={8}>
          <h2>
            <strong> 8. Disclaimers</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            8.1 EXCEPT AS DESCRIBED IN THE PRECEDING ITEM ABOVE, ALL EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND
            WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
            NON-INFRINGEMENT ARE DISCLAIMED, EXCEPT TO THE EXTENT THAT THESE DISCLAIMERS ARE HELD TO BE LEGALLY INVALID.
            WE MAKE NO REPRESENTATIONS, WARRANTIES OR GUARANTEES ABOUT THE SERVICES THAT WE PROVIDE AND THEIR
            AVAILABILITY, SAFETY, OR RELIABILITY (EXCEPT IN RELATION TO NON-EXCLUDABLE OBLIGATIONS IN LAW).
          </span>
        </p>
        <br />
        <ol start={9}>
          <h2>
            <strong> 9. Limitation of Liability and Indemnification</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            9.1 TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT DO WE NOR ANY OF OUR DIRECTORS, EMPLOYEES, AGENTS,
            OR RELATED BODIES CORPORATE ACCEPT LIABILITY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, PUNITIVE, EXEMPLARY,
            SPECIAL, OR INCIDENTAL DAMAGES, INCLUDING, WITHOUT LIMITATION, DELAY, INCONVENIENCE, LOSS OF PROFITS, OR
            ADDITIONAL EXPENSE WHICH MAY BE SUFFERED DUE TO (WITHOUT LIMITATION) YOUR USE OF OR THE INABILITY TO USE OUR
            SERVICES, THIRD PARTY PROVIDERS, FORCE MAJEURE, OR EVENTS THAT WE CANNOT CONTROL OR WHICH COULD NOT HAVE
            BEEN PREVENTED BY REASONABLE DILIGENCE ON OUR PART.
          </span>
        </p>
        <br />
        <p>
          <span>
            9.2 IF IT IS DETERMINED THAT WE ARE LIABLE FOR ANY LOSS OR DAMAGE THAT ARISES OUT OF, OR IS CONNECTED TO,
            YOUR USE OF THE DTRAVEL PLATFORM, OUR MAXIMUM LIABILITY UNDER THESE TERMS SHALL NOT EXCEED: (A) IN THE CASE
            OF GUESTS, THE TOTAL COST OF THE RESERVATIONS MADE BY THE GUEST ON THE DTRAVEL PLATFORM IN THE 6-MONTH
            PERIOD IMMEDIATELY PRECEDING THE EVENT RESULTING IN THE LIABILITY; (B) IN THE CASE OF HOSTS, THE TOTAL VALUE
            OF THE RESERVATIONS RECEIVED BY THE HOST ON THE DTRAVEL PLATFORM IN THE 1-MONTH PERIOD IMMEDIATELY PRECEDING
            THE EVENT RESULTING IN THE LIABILITY; (C) IN THE CASE OF ANY OTHER PARTY THAT IS NOT A GUEST OR HOST, SUCH
            LIABILITY SHALL BE LIMITED TO US$100.00.
          </span>
        </p>
        <br />
        <p>
          <span>
            9.3 IN THE EVENT THAT THIS PROVISION IS UNENFORCEABLE IN YOUR JURISDICTION, THE LIMITATIONS, EXCLUSIONS AND
            DISCLAIMERS WILL APPLY TO THE MAXIMUM EXTENT POSSIBLE, AS PERMITTED BY APPLICABLE LAW.
          </span>
        </p>
        <br />
        <p>
          <span>
            9.4 YOU (BEING A HOST, GUEST OR ANY OTHER FORM OF USER OF THE DTRAVEL PLATFORM) AGREE TO FULLY INDEMNIFY US
            AND OUR DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SUCCESSORS, ASSIGNS AND/OR AFFILIATES (INCLUDING OUR
            AFFILIATED, SUBSIDIARY AND/OR PARENT COMPANIES) FOR ANY AND ALL (WITHOUT LIMITATION) DAMAGES, COSTS,
            EXPENSES, LIABILITIES, FINES AND/OR PENALTIES, INCLUDING ATTORNEY FEES, WHICH ARISE AS A RESULT OF YOUR
            BREACH OF THESE TERMS OR ANY OTHER TERMS SUPPLEMENTAL OR RELATED TO THE DTRAVEL PLATFORM, YOUR VIOLATION OF
            ANY APPLICABLE LAW OR THE RIGHTS OF ANY THIRD PARTIES AND/OR ANY OTHER ACT OR OMISSION BY YOU WHICH IS IN
            RELATION TO THE SUBJECT MATTER OF THE TERMS HEREIN.&nbsp;
          </span>
        </p>
        <br />
        <ol start={10}>
          <h2>
            <strong> 10. Miscellaneous</strong>
          </h2>
        </ol>
        <br />
        <p>
          <span>
            10.1 We and any of our related third parties make no representation about the suitability of the
            information, software, products and services contained on the Dtravel Platform for any purpose, and the
            inclusion or offering for sale of any products or services on the Dtravel Platform does not constitute any
            endorsement or recommendation of such products or services by us or any of our related third parties. All
            such information, software, products and services are provided &quot;as is&quot; and without warranty of any
            kind.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.2 You agree that, by using the Dtravel Platform, whether as a Guest or a Host, no joint venture, agency,
            partnership, or employment relationship exists between you and us.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.3 By displaying Accommodation in international destinations on the Dtravel Platform, we do not warrant
            that travel to such destinations is without risk. Accordingly, we will not be liable for any damages or
            losses that may be incurred by you as a result of you traveling to such destinations. You are strongly
            advised to check the relevant travel advisories issued by your country for any destination you are visiting
            and to take the necessary precautions.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.4 The currency rates displayed on the Dtravel Platform are not verified or guaranteed by us as being
            accurate and should be used as guidelines only. Rates are not guaranteed to be updated every day and actual
            rates may vary.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.5 The maximum number of occupants in an Accommodation is dependent on each Host’s policy. This maximum
            occupancy cannot be exceeded at any time (unless explicitly authorized by the Host), regardless of the
            duration of any additional occupants’ presence at an Accommodation. Parties and events which cause a
            disturbance are generally not allowed unless explicitly specified otherwise. A disturbance may arise out of
            any number of factors and may not necessarily require the maximum occupancy to be exceeded. For example, a
            disturbance may occur when a noise complaint is made, when violence or unruly behavior is observed, or when
            police become involved.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.6 The information, software, and Accommodation published, displayed or used on the Dtravel Platform may
            include inaccuracies or typographical errors. We do not guarantee the accuracy of any part of the Dtravel
            Platform and disclaim all liability for any errors or other inaccuracies relating to the information,
            pricing and description of Accommodation on the Dtravel Platform. We will not be liable for any inaccuracies
            displayed on the website relating to, without limitation, descriptions of Accommodations, photographs of
            Accommodations, property of Accommodations, or lists of amenities or facilities and their respective
            availability, nor will we be liable to reimburse or cover any insufficiency of cost payable by the Guest to
            the Host due to the inaccurate Reservation Price posted by the Host which had already been paid by a Guest.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.7 We reserve the right to blacklist users from the Dtravel Platform on a permanent or temporary basis, at
            our discretion. Any such blacklisted user must not attempt to use the Dtravel Platform under any other name,
            wallet address or through any other user.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.8 These Terms are subject to existing laws and legal processes that we are subject to in providing the
            Dtravel Platform and all other aspects of these Terms. Nothing contained in these Terms limits our right to
            comply with law enforcement, governmental or legal requests, or requirements relating to your use of the
            Dtravel Platform. To the maximum extent permitted by applicable law, you agree to bring any claim or cause
            of action arising from or relating to your access or use of the Dtravel Platform within two (2) years from
            the date on which such claim or action arose or accrued, or such claim or cause of action will be
            irrevocably waived.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.9 These Terms, including any other relevant terms and conditions or policies referenced herein,
            constitute the entire agreement between you and us with respect to the Dtravel Platform. These Terms
            supersede all prior or contemporaneous communications (whether electronic, oral, or written) between you and
            us with respect to the Dtravel Platform.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.10 If any provision of these Terms is deemed invalid or unenforceable, the provision will be enforceable
            to the maximum extent permissible and the remaining provisions will remain in full force and effect. Any
            invalid or ineffective provision shall be replaced with a new, valid and effective one which corresponds to
            the intent and purpose of the provision that is being replaced.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.11 These Terms may be amended at any stage without notice at our sole discretion and will be effective
            immediately upon their publication on the Dtravel Platform. By continuing to use the Dtravel Platform, you
            agree to the changes set out in these Terms. If you do not agree to any modification to these Terms, you
            should cease using the Dtravel Platform immediately. We encourage you to review these Terms often to stay up
            to date with the current terms and conditions that apply to your use of the Dtravel Platform.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.12 The information and personal data that you provide when placing a reservation is processed in
            accordance with our Privacy & Cookie Policy, which forms an inseparable part of these Terms. By accepting
            these Terms, you confirm that you have read and understood our Privacy & Cookie Policy.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.13 Our contractual obligations to you under these Terms will be hindered, delayed, or prevented due to
            reasons of Force Majeure. In instances of Force Majeure, we are exempt from any derived legal
            responsibilities arising from such deficiencies or non-compliances.
          </span>
        </p>
        <br />
        <p>
          <span>
            10.14 These Terms, the legal relations established under these Terms, and all disputes arising out of or in
            connection with these Terms, are governed by the laws of the Cayman Islands.&nbsp;
          </span>
        </p>
        <br />
        <p>
          <span>
            10.15 In the event of a dispute arising out of or in connection to these Terms, you agree to notify us in
            writing of such dispute prior to initiating a claim in a court, tribunal or through arbitration and attempt
            in good faith to negotiate an informal resolution to the dispute. In the event that such dispute is not
            successfully resolved within ninety (90) days from the date of notification of dispute to us, without
            ousting the jurisdiction of a court or tribunal of competent jurisdiction, Any dispute arising out of or in
            connection with these Terms may be resolved by binding arbitration. The arbitration shall be administered by
            the International Chamber of Commerce (“ICC”) in accordance with the ICC Rules of Arbitration in force at
            the time of commencement. The parties agree that, under the ICC Rules of Arbitration, the arbitrator shall
            have the exclusive power to rule on any dispute arising out of or in connection with these Terms. The number
            of arbitrators shall be one, and any and all costs of the arbitrator shall be equally shared between the
            parties. The administrative filing fees of the ICC shall be borne solely by the party claiming against us in
            the event the arbitration route is chosen by the parties to resolve the dispute.
          </span>
        </p>
      </div>
    </LayoutHome>
  </>
)

TearmsAndConditions.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default TearmsAndConditions
