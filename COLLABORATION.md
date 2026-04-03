# SUNi Admin React — Collaboration Guide

> 공동 작업자가 이 문서만 읽고 다음 페이지를 **동일한 디자인 퀄리티**로 개발할 수 있도록 작성된 가이드입니다.

---

## 1. 프로젝트 셋업

### 환경 요구사항
- **Node.js** >= 18
- **npm** (패키지 매니저)

### 최초 설치
```bash
npm install
npm run dev        # http://localhost:5173
```

### 스크립트
| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (Vite HMR) |
| `npm run build` | TypeScript 체크 + 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 로컬 프리뷰 |
| `npm run lint` | ESLint 검사 |

### 핵심 기술 스택
| 기술 | 버전 | 역할 |
|------|------|------|
| React | 19.x | UI 프레임워크 |
| TypeScript | 5.9.x | 타입 시스템 |
| Vite | 8.x | 빌드 도구 |
| Tailwind CSS | 4.x | 유틸리티 CSS |
| shadcn/ui | 4.x | 컴포넌트 라이브러리 |
| @base-ui/react | 1.3.x | 프리미티브 컴포넌트 (Button 등) |
| class-variance-authority | 0.7.x | 컴포넌트 variant 관리 |
| lucide-react | 1.7.x | 아이콘 (구조적 아이콘) |
| @remixicon/react | 4.9.x | 아이콘 (검색, 홈 등) |

### 경로 별칭
```
@/* → ./src/*
```
모든 import는 `@/components/ui/button` 형태로 작성합니다.

---

## 2. 프로젝트 구조

```
src/
├── main.tsx                          # 앱 진입점
├── App.tsx                           # 루트 컴포넌트 (현재 단일 페이지)
├── index.css                         # 디자인 토큰 + Tailwind 설정
├── lib/
│   └── utils.ts                      # cn() 유틸리티 (clsx + tailwind-merge)
├── hooks/
│   └── use-mobile.ts                 # useIsMobile() — 768px 반응형 감지
├── components/
│   ├── layout/                       # ★ 재사용 레이아웃 (모든 페이지 공통)
│   │   ├── GNB.tsx                   # 상단 글로벌 네비게이션 (48px)
│   │   ├── LNB.tsx                   # 좌측 사이드 네비게이션 (280px)
│   │   └── SuniLogo.tsx              # SVG 로고 컴포넌트
│   ├── features/                     # ★ 페이지별 기능 컴포넌트
│   │   ├── DashboardSummary.tsx      # 통계 카드 그리드
│   │   ├── OrganizationTree.tsx      # 조직도 트리 (350px)
│   │   └── MemberTable.tsx           # 구성원 데이터 테이블
│   └── ui/                           # ★ shadcn/ui 프리미티브 (수정 금지)
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── table.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── pagination.tsx
│       ├── collapsible.tsx
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── separator.tsx
│       ├── toggle.tsx
│       ├── toggle-group.tsx
│       ├── tooltip.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       └── skeleton.tsx
```

### 디렉토리 규칙
| 디렉토리 | 용도 | 수정 여부 |
|-----------|------|-----------|
| `components/ui/` | shadcn 원본 프리미티브 | **수정 금지** — 필요 시 새 컴포넌트 추가만 |
| `components/layout/` | GNB, LNB 등 공통 레이아웃 | 메뉴 데이터만 수정 가능 |
| `components/features/` | 페이지별 기능 컴포넌트 | **새 페이지 컴포넌트는 여기에 생성** |

---

## 3. 디자인 토큰 (Design Tokens)

모든 토큰은 `src/index.css`의 `:root`에 정의되어 있습니다. **하드코딩된 색상 값을 절대 사용하지 마세요.**

### 색상 토큰

#### 핵심 시맨틱 토큰 (가장 자주 사용)
| Tailwind 클래스 | CSS 변수 | 값 | 용도 |
|-----------------|----------|-----|------|
| `text-foreground`, `bg-foreground` | `--foreground` | `#262626` (Neutral 800) | 기본 텍스트, 제목 |
| `bg-primary`, `text-primary` | `--primary` | `#6684B6` (Blue 500) | 활성 상태, 토글, 페이지네이션, 섹션 타이틀바 |
| `text-primary-foreground` | `--primary-foreground` | `#FFFFFF` | primary 배경 위 텍스트 |
| `text-secondary-foreground` | `--secondary-foreground` | `#4B5C92` | 레거시 (action 토큰으로 대체됨) |
| `bg-secondary` | `--secondary` | `#FAFAFA` (Neutral 50) | 테이블 헤더 배경 |
| `text-muted-foreground` | `--muted-foreground` | `#A3A3A3` (Neutral 400) | 비활성 텍스트, placeholder |
| `border-border` | `--border` | `#DBE2EF` (Blue 200) | 모든 보더, 구분선 |
| `bg-sidebar-primary` | `--sidebar-primary` | `#3B4B7F` (Blue 600) | GNB 하단선, LNB 카테고리명 |
| `bg-accent` | `--accent` | `#EDF4FB` (Blue 100) | 메뉴 활성/호버 배경 |
| `text-destructive` | `--destructive` | `#D72337` (Error 600) | 강조 숫자, 에러 |

#### Domain / LMS 액션 토큰 (★ 버튼에 우선 사용)
| Tailwind 클래스 | CSS 변수 | 값 | 용도 |
|-----------------|----------|-----|------|
| `bg-action-primary`, `text-action-primary` | `--color-action-primary` | `#FF664D` (lms/orange) | **핵심 액션 버튼** (조직변경, 확인) ★ |
| `bg-action-secondary`, `text-action-secondary` | `--color-action-secondary` | `#6C788F` (blue/450) | **보조 액션 버튼** (취소, 이전, 목록) ★ |
| `bg-lms-primary`, `text-lms-primary` | `--color-lms-primary` | `#3E7FE3` | 트리 Active 배경, GNB 토글 Active 텍스트 |
| `bg-lms-secondary` | `--color-lms-secondary` | `#F3F4FA` | GNB 토글 비활성 배경 |
| `bg-lms-orange` | `--color-lms-orange` | `#FF664D` | LMS 오렌지 Raw |
| `bg-blue-450` | `--color-blue-450` | `#6C788F` | Blue Gray Raw |

#### Raw 컬러 스케일 (직접 참조)
| Tailwind 클래스 | 값 | 용도 |
|-----------------|-----|------|
| `bg-blue-50` | `#F3F4FA` | **콘텐츠 영역 배경**, 행 호버, LNB 활성 |
| `bg-neutral-50` | `#FAFAFA` | 트리 leaf 항목 배경 |
| `bg-neutral-100` | `#F5F5F5` | 트리 branch 비활성 배경 |
| `text-neutral-500` | `#737373` | LNB 비활성 메뉴 텍스트 |
| `text-neutral-600` | `#525252` | 카드 라벨 텍스트 |
| `text-neutral-400` | `#A3A3A3` | 페이지네이션 비활성, placeholder 아이콘 |
| `border-neutral-200` | `#E5E5E5` | 세퍼레이터 |

### 레이아웃 치수
| 요소 | 값 | 비고 |
|------|-----|------|
| GNB 높이 | `48px` (`h-12`) | `border-b-2 border-sidebar-primary` 포함 |
| LNB 너비 | `280px` (`w-[280px]`) | 고정, `min-w-[280px]` 필수 |
| 트리 패널 너비 | `350px` (`w-[350px]`) | 고정, `min-w-[350px]` 필수 |
| 컨트롤바 높이 | `60px` (`h-[60px]`) | 트리/테이블 상단 |
| 콘텐츠 패딩 | `p-6 px-7` | main 영역 |
| 기본 radius | `0.25rem` (4px) | `--radius` 변수 |

### 타이포그래피
| 용도 | 크기 | 굵기 | 클래스 |
|------|------|------|--------|
| 페이지 타이틀 | 20px | Bold (700) | `text-xl font-bold` |
| 섹션 제목 | 16px | Bold (700) | `text-[16px] font-bold` |
| 버튼/메뉴/컨트롤 | 14px | Bold/Semibold | `text-[14px] font-bold` |
| 본문/테이블 셀 | 13px | Regular (400) | `text-[13px]` |
| **트리 1Depth** | **12px** | **Bold (700)** | `text-[12px] font-bold` ★ |
| **트리 2Depth** | **12px** | **Medium (500)** | `text-[12px] font-medium` ★ |
| Breadcrumb | 12px | Regular | `text-xs` |
| 설명문 | 12px | Regular | `text-xs` |

> **폰트**: Noto Sans KR (Google Fonts에서 400, 500, 600, 700 로드)

---

## 4. 핵심 구현 규칙

### 4-1. 수직 정렬 공식 (트리 구조 필수)

트리 구조 작업 시 반드시 지켜야 하는 정렬 원칙:

```
★★★ "상위 텍스트 시작점 = 하위 박스 시작점" ★★★
```

```
┌─────────────────────────────────┐
│ ▼  배터리 사업 기획 본부         │  ← 1Depth (px-4, 텍스트 시작 ~40px)
└─────────────────────────────────┘
     ┌───────────────────────────┐
     │  사업 기획 1팀 (12명)      │  ← 2Depth (ml-[40px]) 박스의 시작점이
     └───────────────────────────┘     1Depth 텍스트 시작점과 일치
```

구현 코드:
```tsx
{/* 1Depth — Branch Header */}
<CollapsibleTrigger className="px-4 py-2.5 gap-2">
  <ChevronDown className="w-4 h-4" />       {/* 아이콘: ~16px */}
  <span className="text-[12px] font-bold">   {/* gap-2(8px) 후 텍스트 시작 ≈ 40px */}
    {branch.name}
  </span>
</CollapsibleTrigger>

{/* 2Depth — Leaf Items */}
<div className="ml-[40px] mt-[8px] space-y-[8px]">  {/* ← ml-[40px]으로 정렬 */}
  <button className="px-4 py-2 text-[12px] font-medium">
    {leaf.name}
  </button>
</div>
```

### 4-2. 폰트 위계 규칙

| 깊이 | 굵기 | 클래스 | 예시 |
|------|------|--------|------|
| 1Depth (Branch) | **Bold** | `font-bold` | 배터리 사업 기획 본부 |
| 2Depth (Leaf) | **Medium** | `font-medium` | 사업 기획 1팀 |
| 활성 메뉴 | **Bold** | `font-bold` | LNB 선택된 메뉴 |
| 비활성 메뉴 | Regular | 기본 | LNB 미선택 메뉴 |

### 4-3. 버튼 스타일 패턴

#### 핵심 액션 버튼 (Primary — 조직변경, 확인 등)
```tsx
<Button
  className="h-10 px-8 text-[14px] font-bold bg-action-primary text-white hover:bg-action-primary/90"
>
  조직 변경
</Button>
```

#### 보조 액션 버튼 (Secondary — 취소, 목록, 이전 등)
```tsx
<Button
  variant="outline"
  size="sm"
  className="text-[14px] font-bold border-action-secondary text-action-secondary bg-white hover:bg-action-secondary hover:text-white"
>
  취소
</Button>
```

핵심: Primary → `action-primary (#FF664D)`, Secondary → `action-secondary (#6C788F)`, hover 시 배경 반전

### 4-4. 검색 입력 패턴

```tsx
<div className="relative">
  <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
  <Input
    placeholder="Search..."
    className="h-9 w-[176px] text-[14px] pl-9 border-border text-neutral-500 placeholder:text-neutral-400"
  />
</div>
```

### 4-5. 테이블 패턴

```tsx
{/* 헤더: secondary 배경, foreground 볼드 텍스트, border 구분선 */}
<TableHead className="text-center border-r border-border text-foreground font-bold text-[13px] py-2">
  컬럼명
</TableHead>

{/* 셀: 13px, foreground, border 구분선, hover:bg-blue-50 */}
<TableRow className="hover:bg-blue-50">
  <TableCell className="text-center border-r border-border py-2 text-[13px] text-foreground">
    값
  </TableCell>
</TableRow>
```

### 4-6. 섹션 타이틀바 패턴

```tsx
<div className="bg-primary border border-primary rounded-t-sm px-4 py-2.5 text-[13px] font-semibold text-white">
  [ 제목 ] 설명 텍스트
</div>
<div className="border border-border border-t-0 rounded-b-sm min-h-[500px] bg-background">
  {/* 콘텐츠 */}
</div>
```

---

## 5. 새 페이지 만드는 방법 (Layout Wrapper 패턴)

### Step 1: 기능 컴포넌트 생성

`src/components/features/` 에 새 컴포넌트를 만듭니다:

```tsx
// src/components/features/NewFeaturePage.tsx

export function NewFeaturePage() {
  return (
    <>
      {/* 필요한 콘텐츠 구현 */}
    </>
  )
}
```

### Step 2: App.tsx에 Layout Wrapper 패턴 적용

현재 `App.tsx`의 레이아웃 구조를 그대로 유지하면서 콘텐츠 영역만 교체합니다:

```tsx
// src/App.tsx — Layout Wrapper 패턴

import { GNB } from '@/components/layout/GNB'
import { LNB } from '@/components/layout/LNB'
import { RiHome4Fill } from '@remixicon/react'

// ★ 새 페이지 컴포넌트만 import 교체
import { NewFeaturePage } from '@/components/features/NewFeaturePage'

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* ─── GNB (48px, 전체 페이지 공통) ─── */}
      <GNB />

      <div className="flex flex-1 overflow-hidden">
        {/* ─── LNB (280px, 전체 페이지 공통) ─── */}
        <LNB />

        {/* ─── Contents Area ─── */}
        <main className="flex-1 overflow-y-auto bg-blue-50 p-6 px-7">
          {/* 타이틀 + Breadcrumb (공통 패턴) */}
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl font-bold text-foreground">
              페이지 타이틀
            </h1>
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <a href="#" className="flex items-center gap-1 hover:text-primary">
                <RiHome4Fill className="w-3.5 h-3.5" />
                HOME
              </a>
              <span className="text-neutral-300">&gt;</span>
              <a href="#" className="hover:text-primary">상위 메뉴</a>
              <span className="text-neutral-300">&gt;</span>
              <span className="text-neutral-600 font-medium">현재 페이지</span>
            </nav>
          </div>
          <p className="text-xs text-foreground mb-[26px]">
            페이지 설명 텍스트
          </p>

          {/* ★ 여기에 새 페이지 콘텐츠 삽입 */}
          <NewFeaturePage />
        </main>
      </div>
    </div>
  )
}
```

### Step 3: LNB 메뉴 데이터 업데이트

`src/components/layout/LNB.tsx`에서 `sections` 배열의 `active` 상태를 변경:

```tsx
// LNB.tsx — 활성 메뉴 변경
{ label: '조직 및 구성원 관리', active: false },  // 이전 페이지
{ label: '구성원 프로필 관리', active: true },     // ← 새 페이지 활성화
```

### 요약 체크리스트
- [ ] `src/components/features/` 에 새 컴포넌트 생성
- [ ] `App.tsx` 에서 import 및 콘텐츠 영역 교체
- [ ] `LNB.tsx` 에서 active 메뉴 변경
- [ ] Breadcrumb 텍스트 업데이트
- [ ] 페이지 타이틀 + 설명 업데이트

---

## 6. 사용 가능한 UI 컴포넌트 목록

모든 컴포넌트는 `@/components/ui/` 에서 import:

| 컴포넌트 | import 경로 | 현재 사용처 |
|----------|------------|-------------|
| `Button` | `@/components/ui/button` | GNB, 트리, 테이블, App |
| `Card` | `@/components/ui/card` | DashboardSummary |
| `Checkbox` | `@/components/ui/checkbox` | MemberTable |
| `Input` | `@/components/ui/input` | 트리/테이블 검색 |
| `Table`, `TableHeader`, `TableBody`, `TableHead`, `TableRow`, `TableCell` | `@/components/ui/table` | MemberTable |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` | `@/components/ui/select` | GNB 드롭다운 |
| `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink` | `@/components/ui/pagination` | MemberTable |
| `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | `@/components/ui/collapsible` | OrganizationTree |
| `ToggleGroup`, `ToggleGroupItem` | `@/components/ui/toggle-group` | GNB 토글 |
| `Separator` | `@/components/ui/separator` | LNB 구분선 |
| `Accordion` | `@/components/ui/accordion` | 미사용 (사용 가능) |
| `Badge` | `@/components/ui/badge` | 미사용 (사용 가능) |
| `Tooltip` | `@/components/ui/tooltip` | 미사용 (사용 가능) |
| `Sheet` | `@/components/ui/sheet` | 미사용 (사용 가능) |
| `Skeleton` | `@/components/ui/skeleton` | 미사용 (사용 가능) |
| `Sidebar` | `@/components/ui/sidebar` | 미사용 (사용 가능) |

### 새 shadcn 컴포넌트 추가 방법
```bash
npx shadcn@latest add [component-name]
# 예: npx shadcn@latest add dialog
```

---

## 7. 아이콘 라이브러리

### Lucide Icons (구조적 아이콘)
```tsx
import { ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, CircleDashed, LogOut } from 'lucide-react'
```

### Remix Icons (기능 아이콘)
```tsx
import { RiSearchLine, RiHome4Fill } from '@remixicon/react'
```

---

## 8. 파일 전달 목록

공동 작업자에게 전달할 때 아래 파일/디렉토리를 포함하고, `node_modules/`는 **반드시 제외**합니다.

### 포함 (필수)
```
├── src/                    # 전체 소스 코드
├── public/                 # 정적 자산
├── index.html              # HTML 진입점
├── package.json            # 의존성 정의
├── package-lock.json       # 의존성 잠금 (동일 환경 보장)
├── tsconfig.json           # TypeScript 설정
├── tsconfig.app.json       # TypeScript 앱 설정
├── tsconfig.node.json      # TypeScript Node 설정
├── vite.config.ts          # Vite 빌드 설정
├── eslint.config.js        # ESLint 설정
├── components.json         # shadcn/ui 설정 (있는 경우)
├── COLLABORATION.md        # 이 가이드
├── DESIGN_SYSTEM_GUIDE.md  # 디자인 시스템 참조
```

### 제외
```
node_modules/               # npm install로 재생성
dist/                       # npm run build로 재생성
.git/                       # 선택 (git 이력 필요 시 포함)
```

### 압축 명령어
```bash
# Windows (PowerShell)
Compress-Archive -Path .\src, .\public, .\index.html, .\package.json, .\package-lock.json, .\tsconfig.json, .\tsconfig.app.json, .\tsconfig.node.json, .\vite.config.ts, .\eslint.config.js, .\COLLABORATION.md, .\DESIGN_SYSTEM_GUIDE.md -DestinationPath suni-admin-react.zip

# Mac/Linux
zip -r suni-admin-react.zip src/ public/ index.html package.json package-lock.json tsconfig*.json vite.config.ts eslint.config.js *.md -x "node_modules/*" -x "dist/*"
```

---

## 9. 디자인 참조

- **Figma UI Kit**: Obra shadcn_ui kit
  - https://www.figma.com/design/LTwyKmtsF6Bl7SqieTD5J7
- **색상 노드**: Colors page (node `842:44435`)
- **상세 매핑**: `DESIGN_SYSTEM_GUIDE.md` 참조

---

## 10. 주의사항 / Do's and Don'ts

### DO (반드시)
- Tailwind 토큰 클래스를 사용할 것 (`text-foreground`, `bg-primary` 등)
- 새 컴포넌트는 `src/components/features/`에 생성할 것
- 트리 구조에서 수직 정렬 공식 준수할 것
- 1Depth → Bold, 2Depth → Medium 폰트 위계 유지할 것
- 버튼은 `secondary-foreground` 아웃라인 패턴 사용할 것
- 테이블은 `border-r border-border` 격자선 패턴 사용할 것

### DON'T (금지)
- ❌ 하드코딩 색상값 사용 (`#6684B6` 대신 `bg-primary`)
- ❌ `components/ui/` 파일 직접 수정
- ❌ GNB/LNB 레이아웃 구조 변경
- ❌ 폰트 파일 추가 (Google Fonts CDN 사용 중)
- ❌ Tailwind 설정 파일 별도 생성 (v4는 CSS 기반 설정)
