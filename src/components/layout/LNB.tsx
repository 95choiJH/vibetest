import { Separator } from '@/components/ui/separator'

interface MenuItem {
  label: string
  active?: boolean
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const sections: MenuSection[] = [
  {
    title: '커리어 서비스 운영관리',
    items: [
      { label: '사내 직무 관리' },
      { label: '진단 기간 설정' },
      { label: '조직 및 구성원 관리', active: true },
      { label: '구성원 프로필 관리' },
      { label: '핵심 영역 관리' },
    ],
  },
  {
    title: 'Skill 관리',
    items: [
      { label: '(공통) Skill 관리' },
      { label: '(회원사) Skill 관리' },
      { label: 'Skill Dictionary 관리' },
      { label: '(공통) Skill Level Guide 관리' },
      { label: '(회원사) Skill 기본 Level Guide 관리' },
      { label: '(회원사) 업무 예제 Level Guide 관리' },
    ],
  },
  {
    title: '커리어 권한 관리',
    items: [
      { label: 'MTI 권한' },
      { label: 'Team Skill Management 권한' },
    ],
  },
  {
    title: '액티비티/커리어패스 관리',
    items: [{ label: '자격증 관리' }],
  },
]

/**
 * LNB — shadcn Separator + 시스템 토큰
 *
 * --sidebar-primary (#3B4B7F) → 카테고리 타이틀
 * --accent (#EDF4FB)          → 활성/호버 배경
 * --foreground (#262626)      → 활성 텍스트
 * --neutral-500 (#737373)     → 비활성 텍스트
 * --border (#DBE2EF)          → LNB 우측 보더
 */
export function LNB() {
  return (
    <aside className="w-[280px] min-w-[280px] bg-background border-r border-border overflow-y-auto py-5 shrink-0">
      <div className="px-4 pb-3 text-[16px] font-bold text-foreground">
        Career 관리
      </div>

      <Separator className="bg-neutral-200 mb-4" />

      {sections.map((section, idx) => (
        <div key={section.title}>
          {idx > 0 && (
            <Separator className="bg-neutral-200 my-4 mx-0" />
          )}
          <div className="px-4 py-2 text-[14px] font-semibold text-sidebar-primary">
            {section.title}
          </div>
          {section.items.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`block px-4 pl-6 py-2 text-[14px] whitespace-nowrap transition-colors
                ${
                  item.active
                    ? 'bg-blue-50 text-foreground font-bold'
                    : 'text-neutral-500 hover:bg-blue-50 hover:text-foreground hover:font-bold'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </aside>
  )
}
