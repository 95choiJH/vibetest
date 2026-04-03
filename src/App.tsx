import { useState } from 'react'
import { GNB } from '@/components/layout/GNB'
import { LNB } from '@/components/layout/LNB'
import { DashboardSummary } from '@/components/features/DashboardSummary'
import { OrganizationTree } from '@/components/features/OrganizationTree'
import { MemberTable } from '@/components/features/MemberTable'
import { MemberOrgChangePopup } from '@/components/features/MemberOrgChangePopup'
import { Button } from '@/components/ui/button'
import { RiHome4Fill } from '@remixicon/react'

export default function App() {
  const [orgChangeOpen, setOrgChangeOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      <GNB />

      <div className="flex flex-1 overflow-hidden">
        <LNB />

        {/* 1. Contents 배경: blue-50 (#F3F4FA) */}
        <main className="flex-1 overflow-y-auto bg-blue-50 p-6 px-7">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl font-bold text-foreground">
              조직 및 구성원 정보 관리
            </h1>
            {/* 2. Breadcrumb: Home 아이콘 추가 */}
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <a href="#" className="flex items-center gap-1 hover:text-primary">
                <RiHome4Fill className="w-3.5 h-3.5" />
                HOME
              </a>
              <span className="text-neutral-300">&gt;</span>
              <a href="#" className="hover:text-primary">커리어 서비스 운영관리</a>
              <span className="text-neutral-300">&gt;</span>
              <span className="text-neutral-600 font-medium">조직 및 구성원 관리</span>
            </nav>
          </div>
          {/* 3. 설명글: 타이틀과 동일 컬러 */}
          <p className="text-xs text-foreground mb-[26px]">
            조직별 등록 현황을 목록으로 확인할 수 있으며, 항목 선택 시 상세페이지로 이동하여 조직 정보와 소속 구성원 정보를 관리할 수 있습니다.
          </p>

          <DashboardSummary />

          {/* 5. 버튼: secondary-foreground (#4B5C92) */}
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              className="text-[14px] font-bold border-action-secondary text-action-secondary bg-white hover:bg-action-secondary hover:text-white"
            >
              목록
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[14px] font-bold border-action-secondary text-action-secondary bg-white hover:bg-action-secondary hover:text-white"
              >
                구성원 추가
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[14px] font-bold border-action-secondary text-action-secondary bg-white hover:bg-action-secondary hover:text-white"
              >
                엑셀 업로드
              </Button>
            </div>
          </div>

          <div className="bg-primary border border-primary rounded-t-sm px-4 py-2.5 text-[13px] font-semibold text-white">
            [ SK이노베이션 ] 조직 및 구성원 정보
          </div>

          <div className="flex border border-border border-t-0 rounded-b-sm min-h-[500px] bg-background">
            <OrganizationTree />
            <MemberTable onOrgChange={() => setOrgChangeOpen(true)} />
          </div>

          <MemberOrgChangePopup open={orgChangeOpen} onOpenChange={setOrgChangeOpen} />
        </main>
      </div>
    </div>
  )
}
