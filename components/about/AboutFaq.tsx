import AboutFaqItem from '@dtravel/components/about/AboutFaqItem';
import React from 'react';
import { EXTERNAL_LINK } from '../dashboard/Dashboard';

const FAQS = [
  {
    question: 'What is Dtravel?',
    answear:
      'Dtravel is a web3 direct booking tool that empowers hosts and property managers to facilitate accommodation bookings without intermediaries.',
  },
  {
    question: 'What do you mean by “direct bookings”?',
    answear:
      'In the context of vacation rentals, direct bookings are peer-to-peer reservations typically made on a host’s own website by email or over the phone. Direct bookings bypass intermediaries like online travel agencies (OTAs) and other short-term rental (STR) platforms.',
  },
  {
    question: 'How does Dtravel empower hosts to facilitate direct bookings?',
    answear:
      'Dtravel functions as a web3 technology and infrastructure provider that facilitates direct transactions between hosts and guests using automated cryptocurrency payments via smart contracts. By leveraging Dtravel’s web3-powered infrastructure, hosts pay lower fees, have the ability to accept both fiat and crypto payments, and maintain greater control of their business without spending time and money on building their own direct booking website.',
  },
  {
    question: 'What is web3 technology?',
    answear:
      'Web3 runs on blockchain technology, which is an immutable, digital public ledger that records transactions completed on the network. Web3 technology enables peer-to-peer transactions that are decentralized, permissionless, and trustless. ',
  },
  {
    question: 'How can I complete a booking?',
    answear:
      'Guests can book a stay at a host’s Dtravel listing using either crypto or fiat. Payments made using crypto will occur on BNB Chain and will only incur a negligible gas fee, while payments made using fiat will incur a credit card processing fee (approximately 3%). ',
  },
  {
    question: 'How do I search for listings on Dtravel?',
    answear:
      'In true direct booking fashion, hosts will initially be responsible for driving their own demand as listings will only be bookable directly via a unique URL. However, we understand the need for guests to have a simple way to view and compare available listings. Our current top priority is working on guest discovery tools that closely align with Dtravel’s web3 ethos.',
  },
  {
    question: 'How will Dtravel handle disputes?',
    answear:
      'Since Dtravel functions as a technology provider rather than an intermediary, communication between a host and guest is not restricted. Any dispute that cannot be settled between a host and a guest, and does not require legal action, may be settled in accord with policies approved by vote of the Dtravel DAO. ',
  },
  {
    question:
      'I’ve signed up for the waitlist but haven’t heard back. What should I do?',
    answear: (
      <>
        <p>
          We are currently working to onboard all waitlist members. You should
          receive an email shortly. Please keep an eye on your inbox and check
          your junk mail in case our communication was incorrectly filtered.
        </p>
        <br />
        <p>
          In the meantime, please join the Dtravel{' '}
          <a
            href={EXTERNAL_LINK.DISCORD}
            target="_blank"
            rel="noreferrer"
            className={'text-[#0069c2] underline'}
          >
            Discord community
          </a>
          . Here, you can chat directly with Dtravel team members and fellow
          travelers, find helpful resources, propose new features, and much
          more. This is also where we’ll be sharing announcements and news first
          before anywhere else.
        </p>
      </>
    ),
  },
  {
    question: 'When will Dtravel be available in my region?',
    answear:
      'Dtravel is available to hosts all around the world. Because Dtravel is a technology provider rather than an intermediary, anyone anywhere can use Dtravel to book directly with their guests. At this stage, hosts need to use Hostaway as their Property Management System (PMS) to list their properties on Dtravel. ',
  },
  {
    question: 'How can I get started hosting on Dtravel?',
    answear: (
      <>
        <p>
          To get started, you’ll need to use Hostaway as your Channel Manager
          and Property Management System (PMS). This will allow you to
          seamlessly create your Dtravel listings and sync them with your other
          channels.
        </p>
        <br />
        <p>
          To sign up for Hostaway, schedule a 1:1 demo{' '}
          <a
            href={'https://bit.ly/dtravelhostaway'}
            target="_blank"
            rel="noreferrer"
            className={'text-[#0069c2] underline'}
          >
            here
          </a>
          . Please mention “Referred by Dtravel” in the comment field so that
          Hostaway can bump you to the top of their waitlist and show you how to
          get set up.
        </p>
        <br />
        <p>
          For those who have less than three properties or are currently using a
          different PMS, we are working to add more Channel Managers and PMS
          integrations in the coming months, and have already received many
          suggestions from the community for our next integrations. If you have
          a request, fill out{' '}
          <a
            href={'https://d2bpe117hv9.typeform.com/to/GNzqpntk'}
            target="_blank"
            rel="noreferrer"
            className={'text-[#0069c2] underline'}
          >
            this survey
          </a>{' '}
          and let us know who you’d like to see as our next integration partner.
        </p>
      </>
    ),
  },
  {
    question: 'Why do hosts need a PMS (Property Management System)?',
    answear: (
      <>
        <p>
          In the beginning, PMS integrations will allow hosts to use Dtravel
          with the least amount of friction, allowing them to effortlessly
          switch on Dtravel and list their properties in bulk without having to
          create specific listings for each property.
        </p>
        <br />
        <p>
          By lowering the barrier to entry, hosts can experience Dtravel and the
          benefits of on-chain bookings without any interruption or change to
          their existing way of managing listings and bookings.
        </p>
      </>
    ),
  },
  {
    question: 'When will Dtravel connect with my PMS? ',
    answear: (
      <>
        We are currently working to add more PMS integrations. If you have a
        request, fill out{' '}
        <a
          href={'https://d2bpe117hv9.typeform.com/to/GNzqpntk'}
          target="_blank"
          rel="noreferrer"
          className={'text-[#0069c2] underline'}
        >
          this survey
        </a>{' '}
        and let us know who you’d like to see as our next integration partner.
      </>
    ),
  },
  {
    question: 'What is a non-custodial wallet?',
    answear: (
      <>
        A non-custodial wallet is a cryptocurrency wallet that gives you full
        control over your funds. Only you have access to the private key, which
        also comes with the additional responsibility of keeping it secure.
        Currently, Dtravel uses MetaMask. If you do not have a MetaMask wallet,
        learn how to set one up{' '}
        <a
          href={
            'https://www.notion.so/dtravel/How-to-Sign-Up-for-a-Non-custodial-Wallet-701e02b46bce41d4afeb9618baf953ac'
          }
          target="_blank"
          rel="noreferrer"
          className={'text-[#0069c2] underline'}
        >
          here
        </a>
        .
      </>
    ),
  },
  {
    question:
      'If I use Dtravel to list my properties will I have insurance coverage?',
    answear:
      'Dtravel is not responsible for any damage or loss that occurs to a property. We highly recommend that hosts have appropriate insurance and comply with their local laws and regulations.',
  },
  {
    question: 'Does Dtravel screen guests?',
    answear: (
      <>
        Dtravel is currently exploring alternative web3 solutions including TRVL
        DAO’s NFT Passport, which will enable guests to share their travel
        credentials and history with hosts. In the meantime, hosts can
        communicate freely with guests and implement their own self-serve
        screening protocols, or select from among seven guest-screening
        providers{' '}
        <a
          href={'https://www.hostaway.com/marketplace'}
          target="_blank"
          rel="noreferrer"
          className={'text-[#0069c2] underline'}
        >
          available in the Hostwaway Marketplace
        </a>
        .
      </>
    ),
  },
  {
    question: 'What are the fees to use Dtravel?',
    answear: (
      <>
        <p>
          Dtravel’s decentralized nature means low overhead costs. To ensure the
          network can be maintained and improved, a 3% host-only fee is
          allocated from each transaction to the Community Treasury.
        </p>
        <br />
        <p>
          The funds in the Community Treasury are entirely reinvested into
          building and expanding the ecosystem, with hosts — as well as other
          community members — having a say on how these funds are used.
        </p>
        <br />
        <p>
          During the introductory period, Dtravel hosts will receive the cost of
          the 3% fee back in the TRVL token, effectively resulting in 0% fees.
        </p>
      </>
    ),
  },
  {
    question: 'How does Dtravel’s fee structure compare to competitors?',
    answear: (
      <>
        <p>
          While fee structures are constantly being revised and experimented
          with by platforms, most generally place greater weight on either
          charging hosts (host-centric) or charging guests (guest-centric):
        </p>
        <br />
        <p>Dtravel = 3% host / 0% guest</p>
        <p>Platforms with host-centric fees = 15% host / 0% guest</p>
        <p>Platforms with guest-centric fees = 3-8% host / 10-14% guest</p>
      </>
    ),
  },
  {
    question: 'What are the fees to book on Dtravel?',
    answear:
      'Guests pay zero fees when booking with crypto. If paying with fiat, guests will incur a ~3% credit card processing fee via Stripe.',
  },
  {
    question: 'What is the TRVL token?',
    answear: (
      <>
        The TRVL token is designed by the TRVL DAO and serves as Dtravel’s
        native web3 ecosystem token. By holding the TRVL token, you become an
        owner in the Dtravel ecosystem and can participate in various activities
        in the broader TRVL ecosystem. Visit{' '}
        <a
          href={'https://trvl.com/'}
          target="_blank"
          rel="noreferrer"
          className={'text-[#0069c2] underline'}
        >
          trvl.com
        </a>{' '}
        to learn more.
      </>
    ),
  },
  {
    question: 'What is the TRVL DAO?',
    answear:
      'The TRVL DAO is a global ecosystem with the mission to decentralize, democratize and revolutionize travel. As a driver of innovation, the TRVL DAO’s web3 development and venture incubation studio focuses on building use cases for TRVL, providing TRVL tokenomics advisory, and supporting travel projects that use TRVL as their native token. One of the first use cases of the TRVL token is Dtravel.',
  },
  {
    question: 'How does the TRVL token contribute to the Dtravel ecosystem?',
    answear:
      'The TRVL token is used to book stays on Dtravel and to incentivize certain actions. As a community-owned and operated ecosystem, TRVL token holders will also be able to shape the future of Dtravel by drafting and voting on proposals throughout the process of progressive decentralization.',
  },
  {
    question: 'How can I earn TRVL?',
    answear: (
      <>
        In the near future, the Dtravel ecosystem will evolve to include TRVL
        tokenomics and loyalty rewards programs. In the meantime, you can earn
        TRVL rewards on{' '}
        <a
          href={'https://trvl.com/earn'}
          target="_blank"
          rel="noreferrer"
          className={'text-[#0069c2] underline'}
        >
          trvl.com
        </a>
        .
      </>
    ),
  },
  {
    question: 'How can I contribute to the DAO?',
    answear: (
      <>
        <p>
          Dtravel has committed to evolving into a sustainable Decentralized
          Autonomous Organization (DAO) structure. To do this, we have decided
          to first stress test this organizational structure internally through
          proposal writing, voting and subDAO operations. We are currently in
          the process of developing an onboarding plan that will empower the
          Dtravel community to contribute to the future of the ecosystem.
        </p>
        <br />
        <p>
          If you’d like to get involved, please join the Dtravel{' '}
          <a
            href={EXTERNAL_LINK.DISCORD}
            target="_blank"
            rel="noreferrer"
            className={'text-[#0069c2] underline'}
          >
            Discord community
          </a>
          .
        </p>
      </>
    ),
  },
];

const AboutFaq = () => {
  return (
    <div
      className={
        'border-t border-sand-4 ' +
        'pb-[64px] md:pb-[88px] lg:pb-[112px] ' +
        'pt-[32px] md:pt-[56px] lg:pt-[64px]'
      }
    >
      <h3
        className={
          'font-maison-neue-medium text-16-18 text-sand-8 tracking-[.2em] uppercase pb-[16px] pt-[32px] lg:pt-[48px]'
        }
        id={'faq'}
      >
        FAQ
      </h3>
      <p
        className={
          'font-pp-monument-extended-bold font-bold text-28-36 text-sand-8 tracking-[-.01em]'
        }
      >
        Frequently asked questions
      </p>

      <div>
        {FAQS.map((item, index) => {
          return (
            <AboutFaqItem
              key={index}
              title={item.question}
              content={item.answear}
              hasBorderBottom={index !== FAQS.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AboutFaq;
