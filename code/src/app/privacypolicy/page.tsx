import Link from 'next/link';

// SEO metadata
export const metadata = {
  title: 'Privacy Policy | Elifein',
  description: 'Learn how Elifein collects, uses, and protects your personal information.',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-[#1a4e78] mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-gray-700">
        <p className="mb-4">Last updated: June 7, 2025</p>
        <p className="mb-4">
          At Elifein, we are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and safeguard your personal information when you
          visit our website or use our services.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address, shipping
          address, and payment details when you place an order or create an account. We also
          collect non-personal information like browsing behavior and IP addresses.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use your information to process orders, improve our services, and communicate
          with you about promotions or updates. We may also use data for analytics to
          enhance your browsing experience.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          3. Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell your personal information. We may share your data with trusted
          third-party service providers (e.g., payment processors, shipping companies) to
          fulfill orders or comply with legal obligations.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          4. Cookies and Tracking
        </h2>
        <p className="mb-4">
          Our website uses cookies to enhance your experience. You can disable cookies in
          your browser settings, but this may affect website functionality.
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          5. Your Rights
        </h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. To
          exercise these rights, please contact us at{' '}
          <Link href="mailto:support@elifein.com" className="text-[#1a7ec2] hover:underline">
            support@elifein.com
          </Link>
          .
        </p>

        <h2 className="text-2xl font-semibold text-[#1a4e78] mt-6 mb-4">
          6. Contact Us
        </h2>
        <p className="mb-4">
          For any questions about this Privacy Policy, please reach out to us at{' '}
          <Link href="mailto:support@elifein.com" className="text-[#1a7ec2] hover:underline">
            support@elifein.com
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;