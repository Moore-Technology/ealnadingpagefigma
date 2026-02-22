import { ArrowRight, Lightbulb, Users, Building2, BookOpen } from 'lucide-react';

interface BridgeConcept {
  topic: string;
  part1Individual: string;
  part2Business: string;
  keyDifference: string;
  example: string;
}

export function DomainBridge() {
  const bridgeConcepts: BridgeConcept[] = [
    {
      topic: 'Cost Basis',
      part1Individual: 'Individual purchases stock for $10,000. Basis = purchase price.',
      part2Business: 'Partner contributes property to partnership. Basis = adjusted basis of contributed property + gain recognized.',
      keyDifference: 'Individual basis is straightforward. Business entity basis involves complex adjustments for liabilities, contributions, and distributions.',
      example: 'Stock purchase vs. Partnership capital account'
    },
    {
      topic: 'Home Office Deduction',
      part1Individual: 'Individual employee: Must meet exclusive & regular use test. Claimed on Schedule A (subject to 2% AGI floor - eliminated by TCJA).',
      part2Business: 'Self-employed on Schedule C: Same tests apply, but deducted FOR AGI with no floor limitation. More favorable treatment.',
      keyDifference: 'Employees lost this deduction post-2017. Self-employed individuals still benefit fully.',
      example: 'W-2 employee (no deduction) vs. 1099 contractor (full deduction)'
    },
    {
      topic: 'Depreciation',
      part1Individual: 'Rental property: MACRS over 27.5 years (residential) or 39 years (commercial). Section 179 not available.',
      part2Business: 'Business property: MACRS varies by asset class. Section 179 expensing and bonus depreciation available.',
      keyDifference: 'Business entities have accelerated depreciation options not available to individual rental property owners.',
      example: 'Residential rental (27.5 yrs) vs. Business equipment (5-7 yrs + Section 179)'
    },
    {
      topic: 'Passive Activity Losses',
      part1Individual: 'Individual with rental loss: $25,000 special allowance if active participation and AGI < $100,000. Losses suspended if not.',
      part2Business: 'Partnership/S-Corp: Material participation rules apply. At-risk and passive activity limits stack. More complex loss limitation layers.',
      keyDifference: 'Individual rental has special allowance. Business entities face multiple limitation hurdles.',
      example: 'Individual rental loss vs. S-Corp shareholder losses'
    },
    {
      topic: 'Health Insurance Premiums',
      part1Individual: 'Individual: Medical expenses deductible as itemized deduction, subject to 7.5% AGI floor.',
      part2Business: 'Self-employed: 100% deduction FOR AGI. S-Corp 2%+ shareholders: Treated as self-employed, deduct on Form 1040.',
      keyDifference: 'Self-employed get above-the-line deduction. Employees stuck with limited itemized deduction.',
      example: 'W-2 employee (7.5% floor) vs. Schedule C (100% FOR AGI)'
    },
    {
      topic: 'Retirement Contributions',
      part1Individual: 'Individual: IRA limit $6,500 ($7,500 if 50+). Traditional IRA may be nondeductible if covered by employer plan.',
      part2Business: 'Business owner: SEP-IRA up to $66,000, Solo 401(k) up to $66,000 + catch-up. Much higher limits.',
      keyDifference: 'Business owners have access to plans with 10x higher contribution limits.',
      example: 'IRA $6,500 vs. SEP-IRA $66,000'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-7 h-7 text-[#FFD700]" />
          <h2 className="text-2xl text-white">Domain Bridge: Part 1 → Part 2</h2>
        </div>
        <p className="text-slate-400 text-sm">
          See how tax concepts you mastered in Part 1 (Individuals) transform when applied to Part 2 (Businesses). 
          Understanding these connections accelerates your Part 2 learning.
        </p>
      </div>

      <div className="space-y-4">
        {bridgeConcepts.map((concept, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8 hover:border-[#BD93F9]/30 transition-all"
          >
            {/* Topic Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#BD93F9]/20 rounded-xl">
                <BookOpen className="w-5 h-5 text-[#BD93F9]" />
              </div>
              <h3 className="text-white text-xl font-semibold">{concept.topic}</h3>
            </div>

            {/* Side-by-side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Part 1: Individual */}
              <div className="bg-gradient-to-br from-[#50FA7B]/10 to-[#50FA7B]/5 border border-[#50FA7B]/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[#50FA7B]" />
                  <span className="text-[#50FA7B] font-semibold text-sm">Part 1: Individual</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{concept.part1Individual}</p>
              </div>

              {/* Part 2: Business */}
              <div className="bg-gradient-to-br from-[#FF8C00]/10 to-[#FFA500]/5 border border-[#FF8C00]/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-[#FF8C00]" />
                  <span className="text-[#FF8C00] font-semibold text-sm">Part 2: Business</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{concept.part2Business}</p>
              </div>
            </div>

            {/* Key Difference */}
            <div className="bg-[#BD93F9]/10 border border-[#BD93F9]/20 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-[#BD93F9] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#BD93F9] font-semibold text-sm mb-2">Key Difference</div>
                  <p className="text-slate-300 text-sm leading-relaxed">{concept.keyDifference}</p>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="font-semibold">Example:</span>
              <span>{concept.example}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Tip */}
      <div className="bg-gradient-to-br from-[#FFD700]/10 to-white/5 backdrop-blur-xl rounded-[20px] border border-[#FFD700]/20 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#FFD700]/20 rounded-xl">
            <Lightbulb className="w-6 h-6 text-[#FFD700]" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Why This Matters</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              The EA exam tests your ability to apply individual tax concepts to business entities. By seeing these "bridges" 
              early, you'll recognize patterns faster when studying Part 2.
            </p>
            <p className="text-slate-400 text-xs">
              <strong className="text-white">Pro Tip:</strong> When you encounter a new Part 2 topic, ask: "How does this differ from 
              the individual version?" This mental model speeds up comprehension by 40%.
            </p>
          </div>
        </div>
      </div>

      {/* Unlock Notice for Part 2 */}
      <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-[20px] border border-white/10 p-6 text-center">
        <div className="text-slate-400 text-sm mb-2">🔒 Part 2 Study Mode</div>
        <p className="text-white font-semibold mb-3">Complete Part 3 to unlock full Part 2 curriculum</p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-[#50FA7B] to-[#FFD700] rounded-full" />
          </div>
          <span className="text-slate-400 text-xs">67% Complete</span>
        </div>
      </div>
    </div>
  );
}
