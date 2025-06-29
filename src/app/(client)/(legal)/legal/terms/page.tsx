import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Terms & Conditions | Arkin Organics",
  description: "Read the terms and conditions governing the use of Arkin Organics. By using our services, you agree to abide by our usage policies and legal terms.",
};

const TermsConditionsPage = () => {
  return (
    <div className="container mx-auto p-6 md:p-10 lg:p-12 bg-white rounded-lg shadow-lg my-8 font-inter">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 border-b-4 border-green-600 pb-4">
        Terms and Conditions
      </h1>
      <p className="text-zinc-600 text-sm md:text-base mb-8">
        <strong>Last Updated:</strong> June 25, 2025
      </p>

      {/* Introductory Paragraphs */}
      <p className="text-zinc-700 text-lg leading-relaxed mb-6">
        Welcome to <strong className="text-green-700">Arkin</strong>! These terms and conditions outline the rules and regulations for the use of <strong className="text-green-700">Arkin&apos;s</strong> Website, located at <strong className="text-green-700">https://www.arkin.com</strong>.
      </p>
      <p className="text-zinc-700 text-lg leading-relaxed mb-6">
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use <strong className="text-green-700">Arkin</strong> if you do not agree to take all of the terms and conditions stated on this page.
      </p>

      {/* Section 1: Introduction and Definitions */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        1. Introduction and Definitions
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        The following terminology applies to these Terms and Conditions, Privacy Statement, Disclaimer Notice, and all Agreements: &quot;Client&quot;, &quot;You&quot;, and &quot;Your&quot; refer to you, the person logging onto this website and compliant with the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot;, and &quot;Us&quot; refer to our Company, <strong className="text-green-700">Arkin</strong>. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot; refer to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of the provision of the Company&apos;s stated services, in accordance with and subject to the prevailing law of <span className="text-green-700">United States</span>.
      </p>

      {/* Section 2: Cookies */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        2. Cookies
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We employ the use of cookies. By accessing <strong className="text-green-700">Arkin</strong>, you agree to use cookies in accordance with <strong className="text-green-700">Arkin&apos;s</strong> Privacy Policy.
      </p>
      <p className="text-zinc-700 leading-relaxed mb-6">
        Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
      </p>

      {/* Section 3: License */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        3. License
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        Unless otherwise stated, <strong className="text-green-700">Arkin</strong> and/or its licensors own the intellectual property rights for all material on <strong className="text-green-700">Arkin</strong>. All intellectual property rights are reserved. You may access this from <strong className="text-green-700">Arkin</strong> for your own personal use, subject to restrictions set in these terms and conditions.
      </p>
      <p className="text-zinc-700 leading-relaxed mb-4">
        You must not:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>Republish material from <strong className="text-green-700">Arkin</strong></li>
        <li>Sell, rent, or sub-license material from <strong className="text-green-700">Arkin</strong></li>
        <li>Reproduce, duplicate, or copy material from <strong className="text-green-700">Arkin</strong></li>
        <li>Redistribute content from <strong className="text-green-700">Arkin</strong></li>
      </ul>
      <p className="text-zinc-700 leading-relaxed mb-6">
        This Agreement shall begin on the date hereof.
      </p>

      {/* Section 4: User Comments */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        4. User Comments
      </h2>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website. <strong className="text-green-700">Arkin</strong> does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of <strong className="text-green-700">Arkin</strong>, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, <strong className="text-green-700">Arkin</strong> shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</li>
        <li><strong className="text-green-700">Arkin</strong> reserves the right to monitor all Comments and to remove any Comments that can be considered inappropriate, offensive, or in breach of these Terms and Conditions.</li>
        <li>You warrant and represent that:
          <ul className="list-circle list-inside text-zinc-700 leading-relaxed pl-8 mt-2 space-y-1">
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material that is an invasion of privacy;</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>
        </li>
        <li>You hereby grant <strong className="text-green-700">Arkin</strong> a non-exclusive license to use, reproduce, edit, and authorize others to use, reproduce, and edit any of your Comments in any and all forms, formats, or media.</li>
      </ul>

      {/* Section 5: Hyperlinking to our Content */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        5. Hyperlinking to our Content
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        The following organizations may link to our Website without prior written approval:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>Government agencies;</li>
        <li>Search engines;</li>
        <li>News organizations;</li>
        <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
        <li>System-wide Accredited Businesses, except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups, which may not hyperlink to our Website.</li>
      </ul>
      <p className="text-zinc-700 leading-relaxed mb-6">
        These organizations may link to our home page, publications, or other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party&apos;s site.
      </p>

      {/* Section 6: iFrames */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        6. iFrames
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
      </p>

      {/* Section 7: Content Liability */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        7. Content Liability
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise from your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of any third-party rights.
      </p>

      {/* Section 8: Reservation of Rights */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        8. Reservation of Rights
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We reserve the right to request that you remove all links or any particular link to our Website. You agree to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound by and follow these linking terms and conditions.
      </p>

      {/* Section 9: Removal of Links from our Website */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        9. Removal of Links from our Website
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but are not obligated to do so or to respond to you directly.
      </p>

      {/* Section 10: Disclaimer */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        10. Disclaimer
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our Website and the use of this Website. Nothing in this disclaimer will:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>Limit or exclude our or your liability for death or personal injury;</li>
        <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
        <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
        <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
      </ul>
      <p className="text-zinc-700 leading-relaxed mb-6">
        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.
      </p>

      {/* Section 11: Specific Terms */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        11. Specific Terms
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        The following terms are specific to the services provided by <strong className="text-green-700">Arkin</strong>:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>
          <strong>Payment Terms:</strong> All payments for services or products must be made in accordance with the pricing and payment schedule outlined at the time of purchase. Late payments may incur a fee of 1.5% per month on the outstanding balance.
        </li>
        <li>
          <strong>Refund Policy:</strong> Refunds are available within 30 days of purchase for eligible products or services, provided they have not been used or accessed substantially. Contact <a href="mailto:support@arkin.com" className="text-green-600 hover:underline">support@arkin.com</a> for refund requests.
        </li>
        <li>
          <strong>Subscription Terms:</strong> Subscriptions automatically renew unless canceled at least 48 hours before the renewal date. You may cancel your subscription through your account dashboard or by contacting support.
        </li>
        <li>
          <strong>User Conduct:</strong> Users must not engage in any activity that disrupts or interferes with our services, including hacking, spamming, or uploading malicious content.
        </li>
        <li>
          <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, <strong className="text-green-700">Arkin</strong> shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Website or services.
        </li>
        <li>
          <strong>Governing Law and Jurisdiction:</strong> These Terms and Conditions are governed by and construed in accordance with the laws of the <span className="text-green-700">State of Delaware, United States</span>. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Delaware.
        </li>
      </ul>

      {/* Section 12: Contact Information */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-12 mb-6">
        12. Contact Information
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-4">
        If you have any questions about these Terms and Conditions, please contact us:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li><strong>By email:</strong> <a href="mailto:support@arkin.com" className="text-green-600 hover:underline">support@arkin.com</a></li>
        <li><strong>By visiting this page on our website:</strong> <a href="https://www.arkin.com/contact" className="text-green-600 hover:underline">https://www.arkin.com/contact</a></li>
        <li><strong>By mail:</strong> <span className="text-green-700">Arkin, 1234 Innovation Drive, Suite 567, Tech City, TC 12345, United States</span></li>
      </ul>
    </div>
  );
};

export default TermsConditionsPage;