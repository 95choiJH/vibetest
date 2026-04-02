import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RiSearchLine } from '@remixicon/react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, CircleDashed } from 'lucide-react'

interface TreeLeaf {
  name: string
  count: number
}

interface TreeBranch {
  name: string
  teamCount: number
  memberCount: number
  children: TreeLeaf[]
  active?: boolean
}

const treeData: TreeBranch[] = [
  {
    name: '배터리 사업 기획 본부',
    teamCount: 4,
    memberCount: 139,
    active: true,
    children: [
      { name: '사업 기획 1팀', count: 12 },
      { name: '사업 기획 2팀', count: 8 },
      { name: '사업 기획 3팀', count: 8 },
      { name: '사업 기획 4팀', count: 10 },
    ],
  },
  {
    name: '경영 본부',
    teamCount: 3,
    memberCount: 15,
    children: [
      { name: '회계 1팀', count: 5 },
      { name: '회계 2팀', count: 6 },
      { name: '경영 지원팀', count: 4 },
    ],
  },
  {
    name: '국내 영업 본부',
    teamCount: 2,
    memberCount: 18,
    children: [
      { name: '영업 1팀', count: 9 },
      { name: '영업 2팀', count: 9 },
      { name: '영업 3팀', count: 9 },
      { name: '영업 4팀', count: 9 },
    ],
  },
]

/**
 * OrganizationTree — Card/Block style tree
 *
 * --secondary-foreground (#4B5C92) → Active branch bg
 * --neutral-100 (#F5F5F5)          → Inactive leaf bg
 * --neutral-700 (#404040)          → Inactive text
 * --blue-50 (#F3F4FA)              → Hover
 */
function TreeNode({ branch }: { branch: TreeBranch }) {
  const [open, setOpen] = useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-[8px] px-2">
      {/* Branch header (1Depth) */}
      <CollapsibleTrigger
        className={`flex items-center w-full px-4 py-2.5 gap-2 cursor-pointer transition-colors text-left rounded-sm ${
          branch.active
            ? 'bg-secondary-foreground text-primary-foreground'
            : 'bg-neutral-100 text-foreground hover:bg-neutral-200'
        }`}
      >
        {open ? (
          <ChevronDown className="w-4 h-4 shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 shrink-0" />
        )}
        <span className="text-[12px] font-bold flex-1">
          {branch.name} ( 팀 {branch.teamCount}개 | 구성원 {branch.memberCount}명 )
        </span>
      </CollapsibleTrigger>

      {/* Leaf items (2Depth) — indented cards */}
      <CollapsibleContent>
        <div className="ml-[40px] mt-[8px] space-y-[8px]">
          {branch.children.map((leaf) => (
            <button
              key={leaf.name}
              className="flex items-center w-full px-4 py-2 text-[12px] font-medium text-foreground bg-neutral-50 hover:bg-blue-50 rounded-sm transition-colors text-left cursor-pointer"
            >
              {leaf.name} ( {leaf.count}명 )
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function OrganizationTree() {
  return (
    <div className="w-[350px] min-w-[350px] border-r border-border flex flex-col">
      {/* Control bar — 380px, h-60px */}
      <div className="flex items-center justify-between px-3 h-[60px] border-b border-border">
        <span className="text-[14px] font-bold text-foreground whitespace-nowrap">
          조직명
        </span>
        <div className="flex items-center gap-[10px]">
          <div className="relative">
            <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search..."
              className="h-9 w-[136px] text-[14px] pl-9 border-border text-neutral-500 placeholder:text-neutral-400"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 text-[14px] font-bold bg-white border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-primary-foreground"
          >
            조직 관리
          </Button>
        </div>
      </div>

      {/* Tree content */}
      <div className="flex-1 overflow-y-auto py-2">
        {treeData.map((branch) => (
          <TreeNode key={branch.name} branch={branch} />
        ))}

        {/* Divider + Unassigned — Depth 1 */}
        <div className="px-2 mt-[12px] mb-[12px]">
          <div className="h-px bg-border" />
        </div>
        <div className="px-2">
          <button
            className="flex items-center w-full px-4 py-2.5 gap-2 bg-neutral-100 text-foreground hover:bg-neutral-200 rounded-sm transition-colors text-left cursor-pointer"
          >
            <CircleDashed className="w-3 h-3 text-foreground shrink-0" />
            <span className="text-[12px] font-bold">
              팀 미지정 구성원 ( 4명 )
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
