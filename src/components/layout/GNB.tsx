import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LogOut } from 'lucide-react'
import { SuniLogo } from './SuniLogo'

const navItems = [
  '회원 관리',
  'Learning 관리',
  '서비스 관리',
  '전시 관리',
  'Certification 관리',
  'Community 관리',
  '문의 응대 관리',
]

/**
 * GNB — shadcn 시스템 토큰만 참조
 *
 * --primary (#6684B6)         → 활성 텍스트, Dot, 토글 활성 배경
 * --primary-foreground (#FFF) → 토글 활성 텍스트, 도움말 버튼 텍스트
 * --sidebar-primary (#3B4B7F) → GNB 언더라인, 도움말 버튼 배경
 * --border (#DBE2EF)          → 토글/셀렉트 보더
 * --muted (#F5F5F5)           → 토글 컨테이너 배경
 * --muted-foreground (#A3A3A3)→ 비활성 토글 텍스트
 * --foreground (#262626)      → 메뉴 기본 텍스트
 */
export function GNB() {
  const [activeToggle, setActiveToggle] = useState<'mysuni' | 'expand'>('expand')

  return (
    <header className="flex items-center h-12 bg-background border-b-2 border-sidebar-primary px-6 shrink-0">
      {/* Logo — LNB 280px 정렬 */}
      <div className="flex items-center w-[280px] min-w-[280px] pl-4 shrink-0">
        <SuniLogo />
      </div>

      {/* Navigation */}
      <nav className="flex items-center flex-1 gap-0">
        {navItems.map((item, i) => (
          <a
            key={item}
            href="#"
            className={`relative flex items-center h-12 px-4 text-sm whitespace-nowrap transition-colors ${
              i === 0
                ? 'text-primary font-bold'
                : 'text-foreground font-medium hover:text-primary'
            }`}
          >
            {i === 0 && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1.5 shrink-0" />
            )}
            {item}
          </a>
        ))}
      </nav>

      {/* Right utilities */}
      <div className="flex items-center gap-3 ml-auto">
        {/* shadcn Button — 도움말 (sidebar-primary = Blue 600) */}
        <Button
          size="sm"
          className="bg-sidebar-primary hover:bg-blue-700 text-primary-foreground text-xs font-semibold gap-1.5 h-8 px-3.5"
        >
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] border-primary-foreground text-[10px] font-bold leading-none">
            i
          </span>
          도움말
        </Button>

        {/* Segmented Toggle — LMS Theme */}
        <div className="flex h-8">
          <button
            onClick={() => setActiveToggle('mysuni')}
            className={`px-4 text-xs font-medium border border-r-0 rounded-l-md cursor-pointer ${
              activeToggle === 'mysuni'
                ? 'bg-secondary text-lms-primary border-border'
                : 'bg-neutral-50 text-neutral-500 border-border hover:bg-neutral-100'
            }`}
          >
            mySUNI
          </button>
          <button
            onClick={() => setActiveToggle('expand')}
            className={`px-4 text-xs font-medium border rounded-r-md cursor-pointer ${
              activeToggle === 'expand'
                ? 'bg-blue-100 text-lms-primary border-border'
                : 'bg-neutral-50 text-neutral-500 border-border hover:bg-neutral-100'
            }`}
          >
            구성원확대
          </button>
        </div>

        {/* shadcn Select — 드롭다운 */}
        <Select defaultValue="mysuni1">
          <SelectTrigger className="h-8 w-auto min-w-[90px] text-xs border-foreground bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mysuni1">mySUNi</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="mysuni2">
          <SelectTrigger className="h-8 w-auto min-w-[90px] text-xs border-foreground bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mysuni2">mySUNi</SelectItem>
          </SelectContent>
        </Select>

        {/* Logout */}
        <button className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-foreground transition-colors cursor-pointer">
          로그아웃
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
