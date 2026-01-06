import { FileText, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export default function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate('about')}
          className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to About</span>
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          </div>

          <p className="text-gray-400 text-sm mb-8">Last Updated: January 4, 2026</p>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed mb-4">
                By accessing and using Viser360, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p className="leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information or software) on Viser360 for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
              <p className="leading-relaxed">
                Under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on Viser360</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Content</h2>
              <p className="leading-relaxed mb-4">
                Users may post comments and other content as long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Disclaimer</h2>
              <p className="leading-relaxed mb-4">
                The materials on Viser360 are provided on an 'as is' basis. Viser360 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitations</h2>
              <p className="leading-relaxed mb-4">
                In no event shall Viser360 or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Viser360.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Accuracy of Materials</h2>
              <p className="leading-relaxed mb-4">
                The materials appearing on Viser360 could include technical, typographical, or photographic errors. Viser360 does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Links</h2>
              <p className="leading-relaxed mb-4">
                Viser360 has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Viser360 of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Modifications</h2>
              <p className="leading-relaxed mb-4">
                Viser360 may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:mostafa@visernic.com" className="text-blue-400 hover:text-blue-300">
                  mostafa@visernic.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
