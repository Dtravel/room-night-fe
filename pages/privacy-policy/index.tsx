import LayoutHome from '@dtravel/components/layout/LayoutHome'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface Props {
  userAgent?: string
}

const PrivacyPolicyPage: NextPage<Props> = () => (
  <>
    <LayoutHome title="Dtravel Privacy & Cookie Policy" description="Dtravel Privacy & Cookie Policy">
      <div className="privacyPolicy max-w-screen-xl m-auto py-20 px-[16px] md:px-10 lg:px-[40px] font-maison-neue-light">
        <h1 className={'mb-4'}>Dtravel Privacy & Cookie Policy</h1>
        <time>Last Updated: 15 August 2022</time>
        <br />
        <br />
        <p>
          Newstart Services, a company incorporated in the Cayman Islands (hereinafter referred to as &ldquo;
          <strong>Dtravel</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo; or &ldquo;<strong>us</strong>
          &rdquo;) recognises the importance of privacy. In this Privacy & Cookie Policy, we describe how we collect,
          use, and disclose information that we obtain about visitors to our website,{' '}
          <a href="https://www.dtravel.com">www.dtravel.com</a>, and the services available through our website.
        </p>
        <h2>
          <strong>1. Information We Collect</strong>
        </h2>
        <p>
          We collect personal information directly from you, from third parties, and automatically through your use of
          our website. We may combine information automatically collected with other information that we have collected
          about you.
        </p>
        <p>Personal information is any information that is about you.</p>
        <p>
          We are the <strong>Data Controller</strong> for data collected through our website.
        </p>
        <p>
          If you are in the EU or the UK, the <strong>lawful basis</strong> when we process your personal information
          for the provision of our services is pursuant to a contract.
        </p>
        <p>
          If you are in the EU or the UK, the <strong>lawful basis</strong> when we process your personal information
          for marketing is consent.
        </p>
        <p>
          You may browse and use certain portions of our website without directly providing us with any personal
          information.
        </p>
        <p>
          Certain features, however, may only be used by users that are registered or where you provide us with personal
          information.
        </p>
        <p>
          <strong>Information we collect from you (or someone acting for you)</strong>:
        </p>
        <ul>
          <li>
            contact information, including your name, address, email address, telephone number and other contact
            details;
          </li>
          <li>
            billing or payment information, such as your credit card number, cardholder name, expiration date,
            authentication code and billing address;
          </li>
          <li>
            details of the products and services we have provided to you or that you have enquired about, including any
            additional information necessary to deliver those products and services and respond to your enquiries; and
          </li>
          <li>information you provide to us through customer surveys or feedback.</li>
        </ul>
        <p>
          <strong>Information about you we collect from third parties.</strong> If you apply to work with us, we collect
          information from you from:
        </p>
        <ul>
          <li>recruitment consultants;</li>
          <li>your previous employers; and</li>
          <li>other organizations that are authorized to give us information about you</li>
        </ul>
        <p>to assist to decide whether we can work with you.</p>
        <p>
          <strong>Information we collect automatically.</strong> We automatically collect information through your use
          of our website using cookies and other technologies. This information includes your:
        </p>
        <ul>
          <li>domain name, operating system, settings and system configurations;</li>
          <li>IP address;</li>
          <li>the webpages you access within our website;</li>
          <li>the website that led you to our website;</li>
          <li>the website to which you go after leaving our website;</li>
          <li>the dates and times you access our website; and</li>
          <li>web log personal information.</li>
        </ul>
        <h2>
          <strong>2. How We Use Your Information</strong>
        </h2>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>
            <strong>Providing our services. </strong>Facilitating accommodation booking services on the website, to
            communicate with you, including via email, about your use of our services, to respond to your inquiries, and
            for similar customer service purposes.
          </li>
          <li>
            <strong>Marketing.</strong> Where you consent, we will provide you with news, special offers, promotions,
            and information about products we think may interest you; and for other marketing, advertising, and
            promotional purposes, provided that you have not opted-out of receiving such communications.
          </li>
          <li>
            <strong>Analyzing Use of Our Services.</strong> To better understand how users access and use our website
            and services, on an aggregated basis; to respond to user desires and preferences; and for other research and
            analytical purposes.
          </li>
          <li>
            <strong>To Protect Rights and Interests.</strong> To protect our rights and interests as well as the rights
            and interests of our customers, users of our website or services, and any other person.
          </li>
        </ul>
        <h2>
          <strong>3. Marketing</strong>
        </h2>
        <p>
          Dtravel would like to send you information about products and services of ours that we think you might like.
          If you have agreed to receive marketing, you may always opt out at a later date. You have the right at any
          time to stop us from contacting you for marketing purposes.
        </p>
        <p>
          If you no longer wish to be contacted for marketing purposes, please click the &lsquo;Unsubscribe&rsquo;
          button contained in the footer of each of our emails or contact us at{' '}
          <a href="mailto:dpo@dtravel.com">dpo@dtravel.com</a>.
        </p>
        <h2>
          <strong>4. How We Store Your Personal Information</strong>
        </h2>
        <p>
          We undertake a number of physical, administrative, personnel, and technical measures to protect your personal
          information and prevent it from misuse, interference and loss, as well as unauthorized access, modification or
          disclosure. Our data security measures include, but are not limited to: Secure Sockets Layer (SSL) encryption
          technology, pseudonymisation, internal data access restrictions, and strict physical access controls to
          buildings and files.
        </p>
        <p>
          Dtravel will keep your personal information for the requisite period in accordance with applicable law. Once
          this time period has expired, we will delete your personal information.
        </p>
        <h2>
          <strong>5. Security</strong>
        </h2>
        <p>
          We take reasonable steps to protect your personal information from misuse, loss, unauthorized access,
          modification or disclosure. For example, we take steps to destroy or permanently de-identify personal
          information if we no longer need it for any purpose. Please be aware that despite our efforts, no personal
          information security measures can guarantee 100% security.
        </p>
        <p>
          Dtravel does not have an account creation system. Rather, it enables you to connect third-party accounts that
          interact with Dtravel. You should take steps to protect against unauthorized access to your accounts connected
          to Dtravel by, among other things, choosing a robust password that nobody else knows or can easily guess and
          keeping your log-in and password private. We are not responsible for any lost, stolen, or compromised
          passwords or for any activity on these accounts via unauthorized password activity.
        </p>
        <h2>
          <strong>6. How We Disclose Your Information</strong>
        </h2>
        <p>We may disclose your information, including personal information, with the following entities:</p>
        <ul>
          <li>
            <strong>Other Dtravel Users.</strong> We will disclose your information to other Dtravel users (for example,
            we will share your information with a host where you request to reserve a host&rsquo;s accommodation) or
            where you leave reviews or comments in public forums.
          </li>
          <li>
            <strong>Service Providers.</strong> We disclose your information to our vendors, service providers, or
            others who perform functions on our behalf. All service providers are required to keep your personal data
            safe and process it pursuant to a data processing agreement. If the service provider is located outside of
            the UK or the EU, we put in place measures to ensure that your information has the same level of protection.
          </li>
          <li>
            <strong>Cross Border Disclosure of Information.</strong> We may disclose your personal information to
            international third parties, including countries outside the European Economic Area (EEA) (collectively
            &ldquo;Cross-border Disclosure&rdquo;), generally to facilitate your reservations and interactions with
            hosts. Whenever we perform Cross-border Disclosures, we will do so in accordance with applicable law and
            ensure that a similar degree of protection is afforded to it by implementing appropriate safeguards.
            Cross-border Disclosures outside the EEA will only be made:
          </li>
        </ul>
        <ol style={{ listStyleType: 'lower-roman', paddingLeft: '6rem' }}>
          <li>to a country recognised by the European Commission as providing an adequate level of protection; or</li>
          <li>
            to a country which does not offer adequate protection, but whose transfer has been governed by the standard
            contractual clauses of the European Commission, or by implementing other appropriate cross-border transfer
            solutions to provide adequate protection.
          </li>
        </ol>
        <p>We may also disclose your information, including personal information, in the following ways:</p>
        <ul>
          <li>
            <strong>Business Transfers.</strong> We may disclose your information to another entity if we are acquired
            by or merged with another company, if we sell or transfer a business unit or assets to another company, as
            part of a bankruptcy proceeding, or as part of a similar business transfer.
          </li>
          <li>
            <strong>Protecting Rights and Interests.</strong> We may disclose your information where we believe it is
            necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations
            involving potential threats to the safety of any person, violations of our{' '}
            <Link href="/terms-and-conditions" passHref>Terms and Conditions</Link> or this Privacy & Cookie Policy, or as evidence in
            litigation in which we are involved.
          </li>
        </ul>
        <h2>
          <strong>7. Cookies and Other Tracking Mechanisms</strong>
        </h2>
        <p>
          We and our service providers use cookies and other tracking mechanisms to track your use of our website or
          services. We use these in a range of ways including:
        </p>
        <ul>
          <li>
            <strong>Keeping you signed in</strong>;
          </li>
          <li>
            <strong>Understanding how you use our website</strong>;
          </li>
          <li>
            <strong>Functionality - </strong>Dtravel uses tracking mechanisms so that we recognise you on our website
            and remember your previously selected preferences. These could include what language you prefer, the
            currency in which prices are displayed and location you are in. A mix of first-party and third-party
            tracking mechanisms are used; and
          </li>
          <li>
            <strong>Advertising - </strong>Dtravel uses these tracking mechanisms to collect information about your
            visit to our website, the content you viewed, the links you followed and information about your browser,
            device, and your IP address. Dtravel shares some limited aspects of this personal information with third
            parties for advertising purposes. We also share personal information collected through tracking mechanisms
            with our advertising partners. This means that when you visit another website, you may be shown advertising
            based on your browsing patterns on our website.
          </li>
        </ul>
        <p>Types of tracking mechanism we use:</p>
        <ul>
          <li>
            <strong>Cookies.</strong> We or our service providers use cookies to track visitor activity on our website.
            A cookie is a text file that a website transfers to your computer&apos;s hard drive for record-keeping
            purposes. We or our service providers may use cookies to track user activities on our website, such as the
            pages visited and time spent on our website. Most browsers allow users to refuse cookies. The
            &lsquo;Help&rsquo; portion of the toolbar on most browsers will tell you how to prevent your computer from
            accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable
            cookies altogether. Users who disable cookies may not be able to browse certain areas of the website; and
          </li>
          <li>
            <strong>Clear GIFs, pixel tags and other technologies.</strong> Clear GIFs are tiny graphics with a unique
            identifier, similar in function to cookies, which are embedded invisibly on web pages. We or our service
            providers may use clear GIFs (also known as web beacons, web bugs or pixel tags), in connection with our
            website to track the activities of visitors to our website, help us manage content, and compile statistics
            about usage of our website. We or our service providers also use clear GIFs in HTML emails to our users, to
            help us track email response rates, identify when our emails are viewed, and track whether our emails are
            forwarded.
          </li>
        </ul>
        <h2>
          <strong>8. Third-party Analytics</strong>
        </h2>
        <p>
          We use service providers, such as{' '}
          <a target={'_blank'} rel="noreferrer" href="https://www.google.com/intl/en/policies/privacy/">
            Google Analytics demographics and interests reports as well as advertising reporting features
          </a>
          , to evaluate the use of our website and our services. We or our service providers use automated devices and
          applications to evaluate use of our website and services. We or our service providers use these tools to help
          us improve our website, services, performance, and user experiences. These entities may use cookies and other
          tracking technologies, such as web beacons or Flash LSO, to perform their services. To opt out of Google
          Analytics, go{' '}
          <a target={'_blank'} rel="noreferrer" href="https://tools.google.com/dlpage/gaoptout/">
            here
          </a>
          . To opt out of Google Analytics for display advertising or customize Google display network ads, you can
          visit the
          <a target={'_blank'} rel="noreferrer" href="https://adssettings.google.com/authenticated">
            {' '}
            Google Ads Settings
          </a>{' '}
          page.
        </p>
        <h2>
          <strong>9. Interest-based Advertising</strong>
        </h2>
        <p>
          We use third parties such as network advertisers to serve advertisements on our website and on third-party
          websites or other media (e.g., social networking platforms). This enables us and these third parties to target
          advertisements to you for products and services in which you might be interested.
        </p>
        <p>
          Users in the United States may opt out of many third-party ad networks. For example, you may go to the Digital
          Advertising Alliance (&quot;DAA&rdquo;){' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.aboutads.info/choices/">
            Consumer Choice Page
          </a>{' '}
          for information about opting out of interest-based advertising and their choices regarding having information
          used by{' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.aboutads.info/participating/">
            DAA companies
          </a>
          . You may also go to the Network Advertising Initiative (&quot;NAI&rdquo;){' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.networkadvertising.org/choices/">
            Consumer Opt-Out Page
          </a>{' '}
          for information about opting out of interest-based advertising and their choices regarding having information
          used by{' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.networkadvertising.org/participating-networks">
            NAI members
          </a>
          .
        </p>
        <p>
          Opting out from one or more companies listed on the DAA{' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.aboutads.info/choices/">
            Consumer Choice Page
          </a>{' '}
          or the NAI{' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.networkadvertising.org/choices/">
            Consumer Opt-Out Page
          </a>{' '}
          will opt you out from those companies&apos; delivery of interest-based content or ads to you, but it does not
          mean you will no longer receive any advertising through our website. You may continue to receive
          advertisements, for example, based on the particular website that you are viewing (i.e., contextually based
          ads). Also, if your browsers are configured to reject cookies when you opt out on the DAA or NAI websites,
          your opt out may not be effective. Additional information is available on the DAA&apos;s website at{' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.aboutads.info/">
            www.aboutads.info
          </a>{' '}
          or the NAI&apos;s website at{' '}
          <a target={'_blank'} rel="noreferrer" href="http://www.networkadvertising.org/">
            www.networkadvertising.org
          </a>
          .
        </p>
        <h2>
          <strong>10. User-generated Content</strong>
        </h2>
        <p>
          Note that if you post information in a publicly accessible portion of our website or service, it may be viewed
          by other users and potentially be further disclosed by those users. Please exercise caution when deciding to
          disclose such information.
        </p>
        <h2>
          <strong>11. Your Choices</strong>
        </h2>
        <p>
          We take steps to ensure the personal information that Dtravel collects, uses or discloses is accurate,
          complete and up-to-date.
        </p>
        <p>
          You may modify your personal information by contacting us at{' '}
          <a target={'_blank'} rel="noreferrer" href="mailto:dpo@dtravel.com">
            dpo@dtravel.com
          </a>
          . On request, we will give you access to the personal information we hold about you. If any personal
          information we hold about you is out of date or inaccurate, we encourage you to let us know by contacting us
          using one of the methods listed above and ask us to correct it.
        </p>
        <p>
          If you are a registered user, we may send periodic informational emails to you. You may opt out of such
          communications at any time by following the opt-out instructions contained in the email. Please note that it
          may take up to five business days for us to process opt-out requests.
        </p>
        <p>
          If you opt out of receiving emails about recommendations or other information we think may interest you, we
          will still send you emails about any services you have requested or received from us provided that you have
          not opted-out of receiving such emails.
        </p>
        <h2>
          <strong>12. Your Rights</strong>
        </h2>
        <p>
          <strong>The right to access</strong> &ndash; You have the right to request us for copies of your personal
          information. We may charge you a small fee for this service.
        </p>
        <p>
          <strong>The right to rectification</strong> &ndash; You have the right to request that we correct any
          information you believe is inaccurate. You also have the right to request us to complete the information you
          believe is incomplete.
        </p>
        <p>
          <strong>The right to erasure</strong> &ndash; You have the right to request that we erase your personal
          information, under certain conditions.
        </p>
        <p>
          <strong>The right to restrict processing</strong> &ndash; You have the right to request that we restrict the
          processing of your personal information, under certain conditions.
        </p>
        <p>
          <strong>The right to object to processing</strong> &ndash; You have the right to object to our processing of
          your personal information, under certain conditions.
        </p>
        <p>
          <strong>The right to personal information portability</strong> &ndash; You have the right to request that we
          transfer the personal information that we have collected to another organization, or directly to you, under
          certain conditions.
        </p>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
          please contact us at{' '}
          <a target={'_blank'} rel="noreferrer" href="mailto:dpo@dtravel.com">
            dpo@dtravel.com
          </a>
          .
        </p>
        <h2>
          <strong>13. Children</strong>
        </h2>
        <p>
          Our website is not targeted to children under 13 years of age and we do not knowingly collect personal
          information from children under 13 without parental consent.
        </p>
        <p>
          If we discover that the personal information of a child under 13 of age is in the system without parental
          consent, we will promptly delete such personal information from our systems.
        </p>
        <p>
          We encourage children of all ages to obtain their parent&apos;s or guardian&apos;s permission before sharing
          personal information with any website.
        </p>
        <h2>
          <strong>14. External Links</strong>
        </h2>
        <p>
          This website contains links to other websites. We are not responsible for the information handling practices
          or content of these external websites. Please read the privacy policies of these third parties before using
          such websites.
        </p>
        <h2>
          <strong>15. Contact Us</strong>
        </h2>
        <p>
          If you have any questions or concerns about the privacy aspects of our website or services or want to complain
          about an interference with your privacy by Dtravel, please email us at{' '}
          <a target={'_blank'} rel="noreferrer" href="mailto:dpo@dtravel.com">
            dpo@dtravel.com
          </a>
          . We will do our best to resolve your complaint as quickly as possible.
        </p>
        <p>You can also contact your local data protection authority to lodge a complaint.</p>
        <p>
          If you are in the EU you can find your Data Protection Authority
          {'  '}
          <a target={'_blank'} rel="noreferrer" href="https://edpb.europa.eu/about-edpb/board/members_en">
            <strong>here</strong>
          </a>
          <strong>.</strong>
        </p>
        <p>
          If you are in the UK you can contact the Information Commissioner&rsquo;s Office{' '}
          <a target={'_blank'} rel="noreferrer" href="https://ico.org.uk/make-a-complaint/">
            <strong>here</strong>
          </a>
          <strong>.</strong>
        </p>
        <h2>
          <strong>16. Changes to this Privacy & Cookie Policy</strong>
        </h2>
        <p>
          We may change this Privacy & Cookie Policy from time to time, and new versions will be posted on this website.
          Please check back periodically for updates.
        </p>
      </div>
    </LayoutHome>
  </>
)

PrivacyPolicyPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default PrivacyPolicyPage
