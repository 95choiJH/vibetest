import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RiSearchLine } from '@remixicon/react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react'

const members = [
  { no: 1, id: 'SKI001', name: '정*희', email: 'ab**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'Y' },
  { no: 2, id: 'SKI056', name: '김*연', email: 'yeon**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'Y' },
  { no: 3, id: 'SKI002', name: '이*현', email: 'rttt**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 3팀', leader: 'Y' },
  { no: 4, id: 'SKI003', name: '김*경', email: 'ty**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 4팀', leader: 'Y' },
  { no: 5, id: 'SKI004', name: '유*권', email: 'kwon**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 6, id: 'SKI005', name: '김*진', email: 'hellok**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 7, id: 'SKI006', name: '성*철', email: 'cheols**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 8, id: 'SKI007', name: '오*정', email: 'oh123**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 9, id: 'SKI008', name: '최*선', email: 'choisu**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 10, id: 'SKI087', name: '김*선', email: 'sunpowe**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 11, id: 'SKI023', name: '구*희', email: 'kook**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 12, id: 'SKI0542', name: '이*라', email: 'gfffg**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 13, id: 'SKI22', name: '김*철', email: '4gff**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 14, id: 'SKI67', name: '박*선', email: 'ladd**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 15, id: 'SKI090', name: '이*현', email: 'jkkk**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 16, id: 'SKI221', name: '허*윤', email: 'heodd**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 2팀', leader: 'N' },
  { no: 17, id: 'SKI374', name: '구*정', email: 'koo11**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 3팀', leader: 'N' },
  { no: 18, id: 'SKI086', name: '원*호', email: 'wwwon**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 3팀', leader: 'N' },
  { no: 19, id: 'SKI099', name: '김*원', email: 'wkim**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 3팀', leader: 'N' },
  { no: 20, id: 'SKI456', name: '김*준', email: 'jun66**@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 3팀', leader: 'N' },
]

/**
 * MemberTable — shadcn Table + Checkbox + Pagination + 시스템 토큰
 *
 * --sidebar-primary (#3B4B7F) → 테이블 헤더 텍스트
 * --secondary (#FAFAFA)       → 테이블 헤더 배경
 * --border (#DBE2EF)          → 셀 격자선
 * --primary (#6684B6)         → 활성 페이지네이션
 * --blue-50 (#F3F4FA)         → 행 호버
 */
export function MemberTable({ onOrgChange }: { onOrgChange?: () => void }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 h-[60px] border-b border-border">
        <span className="text-[14px] text-muted-foreground">
          &#x2022; 전체{' '}
          <span className="text-destructive font-bold">38</span>명 등록
        </span>
        <div className="flex items-center gap-[10px]">
          <div className="relative">
            <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search..."
              className="h-9 w-[176px] text-[14px] pl-9 border-border text-neutral-500 placeholder:text-neutral-400"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-[14px] font-bold bg-white border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-primary-foreground"
            onClick={onOrgChange}
          >
            구성원 소속 및 리더 설정
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="w-9 text-center border-r border-border text-foreground font-bold text-[13px] py-2">
                <Checkbox className="bg-blue-200 border-blue-200" />
              </TableHead>
              <TableHead className="w-[50px] text-center border-r border-border text-foreground font-bold text-[13px] py-2">No</TableHead>
              <TableHead className="w-[80px] text-center border-r border-border text-foreground font-bold text-[13px] py-2">사번</TableHead>
              <TableHead className="text-center border-r border-border text-foreground font-bold text-[13px] py-2">성명</TableHead>
              <TableHead className="text-center border-r border-border text-foreground font-bold text-[13px] py-2">이메일</TableHead>
              <TableHead className="text-center border-r border-border text-foreground font-bold text-[13px] py-2">그룹명</TableHead>
              <TableHead className="text-center border-r border-border text-foreground font-bold text-[13px] py-2">팀명</TableHead>
              <TableHead className="w-[50px] text-center text-foreground font-bold text-[13px] py-2">팀장</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.no} className="hover:bg-blue-50">
                <TableCell className="text-center border-r border-border py-2">
                  <Checkbox className="bg-blue-200 border-blue-200" />
                </TableCell>
                <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">{m.no}</TableCell>
                <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">{m.id}</TableCell>
                <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">{m.name}</TableCell>
                <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">{m.email}</TableCell>
                <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">{m.group}</TableCell>
                <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">{m.team}</TableCell>
                <TableCell className="text-center py-2 text-[13px] text-foreground">{m.leader}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="border-t border-border py-2.5">
        <Pagination>
          <PaginationContent className="gap-1">
            {/* First */}
            <PaginationItem>
              <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                <ChevronsLeft className="w-3.5 h-3.5" />
              </PaginationLink>
            </PaginationItem>
            {/* Prev (icon only) */}
            <PaginationItem>
              <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                <ChevronLeft className="w-3.5 h-3.5" />
              </PaginationLink>
            </PaginationItem>
            {/* Pages */}
            {[1, 2, 3, 4, 5].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === 1}
                  className={`w-7 h-7 text-xs rounded-sm ${
                    page === 1
                      ? 'bg-primary text-primary-foreground border border-primary font-bold'
                      : 'text-neutral-500 hover:text-foreground'
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {/* Ellipsis */}
            <PaginationItem>
              <span className="w-7 h-7 flex items-center justify-center text-xs text-neutral-400">...</span>
            </PaginationItem>
            {/* Last page */}
            <PaginationItem>
              <PaginationLink href="#" className="w-auto h-7 px-1.5 text-xs text-neutral-500 hover:text-foreground">
                739
              </PaginationLink>
            </PaginationItem>
            {/* Next (icon only) */}
            <PaginationItem>
              <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                <ChevronRight className="w-3.5 h-3.5" />
              </PaginationLink>
            </PaginationItem>
            {/* Last */}
            <PaginationItem>
              <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                <ChevronsRight className="w-3.5 h-3.5" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
