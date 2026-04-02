import { Card } from '@/components/ui/card'

const summaryData = [
  { label: '회사명', value: 'SK이노베이션' },
  { label: '사업부', value: '12개' },
  { label: '팀', value: '50개' },
  { label: '리더', value: '50명' },
  { label: '팀원', value: '256명' },
  { label: '팀 미지정 구성원', value: '55명' },
]

/**
 * DashboardSummary — shadcn Card + 시스템 토큰
 *
 * --border (#DBE2EF)     → 셀 구분선
 * --secondary (#FAFAFA)  → 헤더 배경
 * --foreground (#262626) → 값 텍스트
 * --neutral-600 (#525252)→ 라벨 텍스트
 */
export function DashboardSummary() {
  return (
    <Card className="grid grid-cols-6 border-border rounded-sm overflow-hidden mb-4 py-0 gap-0">
      {summaryData.map((item, idx) => (
        <div
          key={item.label}
          className={`text-center ${
            idx < summaryData.length - 1 ? 'border-r border-border' : ''
          }`}
        >
          <div className="bg-secondary border-b border-border px-2 py-2 text-xs font-semibold text-neutral-600">
            {item.label}
          </div>
          <div className="px-2 py-3 text-sm font-semibold text-foreground">
            {item.value}
          </div>
        </div>
      ))}
    </Card>
  )
}
