import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Privacy Policy | Arkin Organics",
  description: "Learn how Arkin Organics collects, uses, and protects your data. Review our privacy practices to understand your rights and our responsibilities.",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-6 md:p-10 lg:p-12 bg-white rounded-lg shadow-lg my-8 font-inter">
      <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 border-b-4 border-green-600 pb-3">
        Privacy Policy
      </h1>
      <p className="text-zinc-600 text-sm md:text-base mb-8">
        <strong>Last Updated:</strong> June 25, 2025
      </p>

      <p className="text-zinc-700 leading-relaxed mb-6">
        Your privacy is critically important to us. This Privacy Policy
        describes how <strong className="text-green-700">Arkin</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses
        information that we obtain about visitors to our website{" "}
        <strong className="text-green-700">https://www.arkin.com</strong> (the &quot;Site&quot;) and users of our services (the &quot;Services&quot;).
      </p>

      {/* Section 1: Information We Collect */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        1. Information We Collect
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-4">
        We collect information to provide and improve our Services, and to
        communicate with you.
      </p>

      <h3 className="text-2xl md:text-3xl font-semibold text-zinc-700 mt-6 mb-3">
        1.1. Information You Provide to Us
      </h3>
      <p className="text-zinc-700 leading-relaxed mb-4">
        We collect information you provide directly to us. For example, we
        collect information when you:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>
          <strong>Create an account:</strong> Your name, email address,
          password, and any other information you choose to provide.
        </li>
        <li>
          <strong>Use our Services:</strong> Information related to your
          interactions, such as agricultural data, product orders, customer
          details, or reports you generate.
        </li>
        <li>
          <strong>Contact us:</strong> When you send us an email, fill out a
          form, or otherwise communicate with us, we collect your name, email
          address, and the content of your communication.
        </li>
        <li>
          <strong>Subscribe to newsletters:</strong> Your email address.
        </li>
        <li>
          <strong>Participate in surveys or promotions:</strong> Any information
          you provide in response to our requests.
        </li>
      </ul>

      <h3 className="text-2xl md:text-3xl font-semibold text-zinc-700 mt-6 mb-3">
        1.2. Information We Collect Automatically
      </h3>
      <p className="text-zinc-700 leading-relaxed mb-4">
        When you access or use our Site or Services, we may automatically
        collect information about you, including:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>
          <strong>Log and Usage Data:</strong> Your Internet Protocol (IP)
          address, browser type, operating system, pages viewed, referring/exit
          pages, and the date and time of your visit.
        </li>
        <li>
          <strong>Device Information:</strong> Information about the computer or
          mobile device you use to access our Services, including hardware
          model, operating system and version, unique device identifiers, and
          mobile network information.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We use cookies and
          similar tracking technologies (like web beacons and pixels) to track
          activity on our Services and hold certain information. Cookies are
          files with a small amount of data which may include an anonymous
          unique identifier. You can instruct your browser to refuse all cookies
          or to indicate when a cookie is being sent. However, if you do not
          accept cookies, you may not be able to use some parts of our Services.
        </li>
      </ul>

      {/* Section 2: How We Use Your Information */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        2. How We Use Your Information
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We use the information we collect for various purposes, including to:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>Provide, operate, and maintain our Site and Services.</li>
        <li>Improve, personalize, and expand our Site and Services.</li>
        <li>Understand and analyze how you use our Site and Services.</li>
        <li>Develop new products, services, features, and functionality.</li>
        <li>
          Communicate with you, either directly or through one of our partners,
          including for customer service, to provide you with updates and other
          information relating to the Services, and for marketing and promotional
          purposes.
        </li>
        <li>
          Send you technical notices, updates, security alerts, and support and
          administrative messages.
        </li>
        <li>Process your transactions and manage your orders.</li>
        <li>
          Monitor and analyze trends, usage, and activities in connection with
          our Services.
        </li>
        <li>
          Detect, prevent, and address technical issues and security incidents.
        </li>
        <li>Comply with legal obligations.</li>
      </ul>

      {/* Section 3: How We Share Your Information */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        3. How We Share Your Information
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We may share your information in the following situations:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>
          <strong>With Service Providers:</strong> We may share your information
          with third-party vendors, consultants, and other service providers who
          perform services on our behalf, such as payment processing, data
          analysis, email delivery, hosting services, and customer service.
        </li>
        <li>
          <strong>For Business Transfers:</strong> If we are involved in a
          merger, acquisition, financing, due diligence, reorganization,
          bankruptcy, receivership, sale of company assets, or transition of
          service to another provider, your information may be sold or
          transferred as part of such a transaction.
        </li>
        <li>
          <strong>For Legal Reasons:</strong> We may disclose your information
          if required to do so by law or in response to valid requests by public
          authorities (e.g., a court or a government agency).
        </li>
        <li>
          <strong>To Enforce Rights:</strong> We may disclose your information
          to enforce our terms and conditions, or to protect our rights,
          privacy, safety, or property, and/or that of our affiliates, you, or
          other third parties.
        </li>
        <li>
          <strong>With Your Consent:</strong> We may share your information with
          your explicit consent or at your direction.
        </li>
        <li>
          <strong>Aggregated or Anonymized Data:</strong> We may share
          aggregated or anonymized information that cannot reasonably be used to
          identify you.
        </li>
      </ul>

      {/* Section 4: Data Security */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        4. Data Security
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We implement reasonable security measures designed to protect your
        information from unauthorized access, use, or disclosure. However, no
        method of transmission over the Internet or method of electronic storage
        is 100% secure. Therefore, we cannot guarantee its absolute security.
      </p>

      {/* Section 5: Data Retention */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        5. Data Retention
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We retain your information for as long as necessary to fulfill the
        purposes outlined in this Privacy Policy, unless a longer retention
        period is required or permitted by law (such as tax, accounting, or
        other legal requirements).
      </p>

      {/* Section 6: Your Data Protection Rights */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        6. Your Data Protection Rights
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        Depending on your location, you may have the following rights regarding
        your personal data:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>
          <strong>Right to Access:</strong> The right to request copies of your
          personal data.
        </li>
        <li>
          <strong>Right to Rectification:</strong> The right to request that we
          correct any information you believe is inaccurate or complete
          information you believe is incomplete.
        </li>
        <li>
          <strong>Right to Erasure:</strong> The right to request that we erase
          your personal data, under certain conditions.
        </li>
        <li>
          <strong>Right to Restrict Processing:</strong> The right to request
          that we restrict the processing of your personal data, under certain
          conditions.
        </li>
        <li>
          <strong>Right to Object to Processing:</strong> The right to object to
          our processing of your personal data, under certain conditions.
        </li>
        <li>
          <strong>Right to Data Portability:</strong> The right to request that
          we transfer the data that we have collected to another organization,
          or directly to you, under certain conditions.
        </li>
      </ul>
      <p className="text-zinc-700 leading-relaxed mb-6">
        If you make a request, we have one month to respond to you. To exercise
        any of these rights, please contact us at{" "}
        <strong className="text-green-700">support@arkin.com</strong>.
      </p>

      {/* Section 7: Third-Party Links */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        7. Third-Party Links
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        Our Site or Services may contain links to other websites that are not
        operated by us. If you click on a third-party link, you will be directed
        to that third party&apos;s site. We strongly advise you to review the Privacy
        Policy of every site you visit. We have no control over and assume no
        responsibility for the content, privacy policies, or practices of any
        third-party sites or services.
      </p>

      {/* Section 8: Children's Privacy */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        8. Children&apos;s Privacy
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        Our Services do not address anyone under the age of 13 (&quot;Children&quot;). We
        do not knowingly collect personally identifiable information from anyone
        under the age of 13. If you are a parent or guardian and you are aware
        that your child has provided us with Personal Data, please contact us.
        If we become aware that we have collected Personal Data from children
        without verification of parental consent, we take steps to remove that
        information from our servers.
      </p>

      {/* Section 9: Changes to This Privacy Policy */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        9. Changes to This Privacy Policy
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-6">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the &quot;Last Updated&quot; date at the top of this Privacy Policy. You
        are advised to review this Privacy Policy periodically for any changes.
        Changes to this Privacy Policy are effective when they are posted on
        this page.
      </p>

      {/* Section 10: Contact Us */}
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mt-10 mb-4">
        10. Contact Us
      </h2>
      <p className="text-zinc-700 leading-relaxed mb-4">
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul className="list-disc list-inside text-zinc-700 leading-relaxed pl-5 mb-6 space-y-2">
        <li>
          <strong>By email:</strong>{" "}
          <a
            href="mailto:support@arkin.com"
            className="text-green-600 hover:underline"
          >
            support@arkin.com
          </a>
        </li>
        <li>
          <strong>By mail:</strong>{" "}
          <span className="text-green-700">
            Arkin, 1234 Innovation Drive, Suite 567, Tech City, TC 12345, United States
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyPage;
