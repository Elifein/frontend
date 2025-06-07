import Link from 'next/link';

// SEO metadata
export const metadata = {
  title: 'Terms and Conditions | Elifein',
  description: 'Read the Terms and Conditions for using Elifein\'s website and services.',
};

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-[#1a4e78] mb-6">Terms and Conditions</h1>
      <div className="prose max-w-none text-gray-700">
        <p className="mb-4">Last updated: June 7, 2025</p>
        <p className="mb-4">
          Welcome to Elifein. These Terms and Conditions govern your use of our website and
          services. By accessing or using our website, you agree to be bound by these terms.
          If you do not agree, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          1. Use of the Website
        </h2>
        <p className="mb-4">
          You must be at least 18 years old to use our website. You agree to use the website
          only for lawful purposes and in a way that does not infringe the rights of others
          or restrict their use of the website.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          2. Products and Services
        </h2>
        <p className="mb-4">
          All products and services are subject to availability. We reserve the right to
          modify or discontinue any product or service without notice. Prices are subject to
          change without prior notice.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          3. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on this website, including text, images, and logos, is the property of
          Elifein or its licensors and is protected by copyright and other intellectual
          property laws. You may not reproduce or distribute any content without permission.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          4. Limitation of Liability
        </h2>
        <p className="mb-4">
          Elifein is not liable for any indirect, incidental, or consequential damages
          arising from your use of the website or services. Our total liability is limited
          to the amount you paid for the products or services.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          5. Contact Us
        </h2>
        <p className="mb-4">
          If you have any questions about these Terms and Conditions, please contact us at{' '}
          <Link href="mailto:support@elifein.com" className="text-[#1a7ec2] hover:underline">
            support@elifein.com
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
