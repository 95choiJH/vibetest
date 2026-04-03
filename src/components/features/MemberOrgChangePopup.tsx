import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  CircleDashed,
  X,
} from 'lucide-react'

/* ─── Types ─── */
interface TreeLeaf {
  name: string
  count: number
  active?: boolean
}

interface TreeBranch {
  name: string
  teamCount: number
  memberCount: number
  children: TreeLeaf[]
  active?: boolean
}

interface Member {
  no: number
  id: string
  name: string
  email: string
  group: string
  team: string
  leader: 'Y' | 'N'
}

interface SelectedMember {
  id: string
  name: string
  email: string
  path: string
  isLeader: boolean
}

/* ─── Mock Data ─── */
const treeData: TreeBranch[] = [
  {
    name: '배터리 사업 기획 본부',
    teamCount: 2,
    memberCount: 12,
    active: true,
    children: [
      { name: '사업 기획 1팀', count: 8, active: true },
      { name: '사업 기획 2팀', count: 4 },
    ],
  },
  {
    name: '경영 본부',
    teamCount: 3,
    memberCount: 12,
    children: [
      { name: '회계 1팀', count: 4 },
      { name: '회계 2팀', count: 4 },
      { name: '경영 지원팀', count: 4 },
    ],
  },
  {
    name: '국내 영업 본부',
    teamCount: 3,
    memberCount: 12,
    children: [
      { name: '영업 1팀', count: 6 },
      { name: '영업 2팀', count: 6 },
      { name: '영업 3팀', count: 0 },
    ],
  },
]

const members: Member[] = [
  { no: 1, id: 'SKI001', name: '정*희', email: 'abobb@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'Y' },
  { no: 2, id: 'SKI002', name: '가*희', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 3, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 4, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 5, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 6, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 7, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 8, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 9, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
  { no: 10, id: 'SKI003', name: '김*경', email: 'abcd@sk.com', group: '배터리 사업 기획 본부', team: '배터리 사업 기획 1팀', leader: 'N' },
]

const initialSelected: SelectedMember[] = [
  { id: 'SKI001', name: '김은경', email: 'abcd@sk.com', path: '배터리 사업기획본부>사업기획1팀', isLeader: true },
  { id: 'SKI056', name: '마은혜', email: 'abab11@sk.com', path: '배터리 사업기획본부>사업기획1팀', isLeader: false },
]

/* ─── Tree Node ─── */
function PopupTreeNode({ branch }: { branch: TreeBranch }) {
  const [open, setOpen] = useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-[8px] px-2">
      <CollapsibleTrigger
        className={`flex items-center w-full px-4 py-2.5 gap-2 cursor-pointer transition-colors text-left rounded-sm ${
          branch.active
            ? 'bg-lms-primary text-primary-foreground'
            : 'bg-neutral-100 text-foreground hover:bg-neutral-200'
        }`}
      >
        {open ? (
          <ChevronDown className="w-4 h-4 shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 shrink-0" />
        )}
        <span className="text-[12px] font-bold flex-1">
          {branch.name} ( 팀 {branch.teamCount}개 | 총 {branch.memberCount}명 )
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="ml-[40px] mt-[8px] space-y-[8px]">
          {branch.children.map((leaf) => (
            <button
              key={leaf.name}
              className={`flex items-center w-full px-4 py-2 text-[12px] rounded-sm transition-colors text-left cursor-pointer ${
                leaf.active
                  ? 'font-bold bg-lms-primary text-primary-foreground'
                  : 'font-medium text-foreground bg-neutral-50 hover:bg-blue-50'
              }`}
            >
              {leaf.name} ( {leaf.count}명 )
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ─── Main Popup Component ─── */
export function MemberOrgChangePopup({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [searchType, setSearchType] = useState('name')
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set([0, 4]))
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>(initialSelected)

  const toggleRow = (idx: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const toggleLeader = (id: string) => {
    setSelectedMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isLeader: !m.isLeader } : m))
    )
  }

  const removeMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[1140px] max-h-[90vh] bg-background rounded-lg ring-1 ring-foreground/10 shadow-xl outline-none flex flex-col data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-100"
        >
          {/* ─── Header ─── */}
          <div className="px-6 py-4 border-b border-border">
            <DialogTitle className="text-[16px] font-bold text-foreground">
              구성원 조직 변경
            </DialogTitle>
          </div>

          {/* ─── Search Bar ─── */}
          <div className="px-6 py-3 border-b border-border">
            <div className="flex items-center gap-4">
              <RadioGroup
                value={searchType}
                onValueChange={setSearchType}
                className="flex items-center gap-4 w-auto"
              >
                {[
                  { value: 'name', label: '이름' },
                  { value: 'email', label: 'E-mail' },
                  { value: 'empNo', label: '사번' },
                  { value: 'division', label: '사업부' },
                  { value: 'team', label: '팀명' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-1.5 text-[13px] text-foreground cursor-pointer whitespace-nowrap"
                  >
                    <RadioGroupItem value={opt.value} />
                    {opt.label}
                  </label>
                ))}
              </RadioGroup>

              <div className="flex items-center gap-2 ml-auto">
                <Input
                  placeholder="이름 입력"
                  className="h-9 w-[220px] text-[13px] border-border placeholder:text-neutral-400"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-5 text-[13px] font-bold border-action-secondary text-action-secondary bg-white hover:bg-action-secondary hover:text-white"
                >
                  검색
                </Button>
              </div>
            </div>
          </div>

          {/* ─── 3-Column Body ─── */}
          <div className="flex flex-1 overflow-hidden border-b border-border">
            {/* ── Left: Organization Tree (350px) ── */}
            <div className="w-[350px] min-w-[350px] border-r border-border flex flex-col">
              <div className="flex items-center justify-between px-3 h-[44px] border-b border-border">
                <span className="text-[13px] font-bold text-foreground">조직명</span>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {treeData.map((branch) => (
                  <PopupTreeNode key={branch.name} branch={branch} />
                ))}
                <div className="px-2 mt-[12px] mb-[12px]">
                  <div className="h-px bg-border" />
                </div>
                <div className="px-2">
                  <button className="flex items-center w-full px-4 py-2.5 gap-2 bg-neutral-100 text-foreground hover:bg-neutral-200 rounded-sm transition-colors text-left cursor-pointer">
                    <CircleDashed className="w-3 h-3 text-foreground shrink-0" />
                    <span className="text-[12px] font-bold">
                      팀 미지정 구성원 ( 12명 )
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Center: Data Table ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center px-4 h-[44px] border-b border-border">
                <span className="text-[13px] text-muted-foreground">
                  구성원 &nbsp;&#x2022;&nbsp; 전체{' '}
                  <span className="text-destructive font-bold">8</span>명 등록
                </span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary">
                      <TableHead className="w-9 text-center border-r border-border text-foreground font-bold text-[12px] py-2">
                        <Checkbox className="bg-blue-200 border-blue-200" />
                      </TableHead>
                      <TableHead className="w-[70px] text-center border-r border-border text-foreground font-bold text-[12px] py-2">사번</TableHead>
                      <TableHead className="w-[60px] text-center border-r border-border text-foreground font-bold text-[12px] py-2">성명</TableHead>
                      <TableHead className="text-center border-r border-border text-foreground font-bold text-[12px] py-2">이메일</TableHead>
                      <TableHead className="text-center border-r border-border text-foreground font-bold text-[12px] py-2">사업부명</TableHead>
                      <TableHead className="text-center border-r border-border text-foreground font-bold text-[12px] py-2">팀명</TableHead>
                      <TableHead className="w-[44px] text-center text-foreground font-bold text-[12px] py-2">리더</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((m, idx) => (
                      <TableRow
                        key={idx}
                        className={`hover:bg-blue-50 ${selectedRows.has(idx) ? 'bg-blue-50' : ''}`}
                      >
                        <TableCell className="text-center border-r border-border py-2">
                          <Checkbox
                            checked={selectedRows.has(idx)}
                            onCheckedChange={() => toggleRow(idx)}
                            className="bg-blue-200 border-blue-200"
                          />
                        </TableCell>
                        <TableCell className="text-center border-r border-border py-2 text-[12px] text-foreground">{m.id}</TableCell>
                        <TableCell className="text-center border-r border-border py-2 text-[12px] text-foreground">{m.name}</TableCell>
                        <TableCell className="text-center border-r border-border py-2 text-[12px] text-foreground">{m.email}</TableCell>
                        <TableCell className="text-center border-r border-border py-2 text-[12px] text-foreground">{m.group}</TableCell>
                        <TableCell className="text-center border-r border-border py-2 text-[12px] text-foreground">{m.team}</TableCell>
                        <TableCell className="text-center py-2 text-[12px] text-foreground">{m.leader}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="border-t border-border py-2">
                <Pagination>
                  <PaginationContent className="gap-1">
                    <PaginationItem>
                      <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                        <ChevronsLeft className="w-3.5 h-3.5" />
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </PaginationLink>
                    </PaginationItem>
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
                    <PaginationItem>
                      <span className="w-7 h-7 flex items-center justify-center text-xs text-neutral-400">...</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="w-auto h-7 px-1.5 text-xs text-neutral-500 hover:text-foreground">
                        20
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="w-7 h-7 text-neutral-400 hover:text-foreground text-xs p-0">
                        <ChevronsRight className="w-3.5 h-3.5" />
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>

            {/* ── Right: Selected Members Panel ── */}
            <div className="w-[280px] min-w-[280px] border-l border-border flex flex-col">
              <div className="flex items-center justify-between px-4 h-[44px] border-b border-border">
                <span className="text-[13px] font-bold text-foreground">
                  선택된 구성원 {selectedMembers.length}명
                </span>
                <button
                  className="text-[11px] px-2.5 py-1 border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
                  onClick={() => setSelectedMembers([])}
                >
                  전체 해제
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-background border border-border rounded-sm px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 mr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-bold text-foreground truncate">
                            {member.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">|</span>
                          <span className="text-[11px] text-muted-foreground truncate">
                            {member.email}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                          {member.path}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Switch
                          checked={member.isLeader}
                          onCheckedChange={() => toggleLeader(member.id)}
                          size="sm"
                        />
                        <span className={`text-[11px] ${member.isLeader ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                          리더
                        </span>
                        <button
                          onClick={() => removeMember(member.id)}
                          className="text-neutral-400 hover:text-foreground transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Footer ─── */}
          <div className="px-6 py-4">
            {/* Select row */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-foreground whitespace-nowrap">사업부</span>
                <Select>
                  <SelectTrigger className="h-9 w-[120px] text-[13px] border-border">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="battery">배터리 사업 기획 본부</SelectItem>
                    <SelectItem value="mgmt">경영 본부</SelectItem>
                    <SelectItem value="sales">국내 영업 본부</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-foreground whitespace-nowrap">팀</span>
                <Select>
                  <SelectTrigger className="h-9 w-[120px] text-[13px] border-border">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team1">사업 기획 1팀</SelectItem>
                    <SelectItem value="team2">사업 기획 2팀</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                className="h-10 px-8 text-[14px] font-bold border-action-secondary text-action-secondary bg-white hover:bg-action-secondary hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                취소
              </Button>
              <Button
                className="h-10 px-8 text-[14px] font-bold bg-action-primary text-white hover:bg-action-primary/90"
              >
                조직 변경
              </Button>
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
