# SUNi Admin - Design System Mapping Guide
> 웹 구현물 → 피그마 역제작 시 참조용 가이드

---

## 피그마 원본 파일
- **파일명**: Obra shadcn_ui kit
- **URL**: https://www.figma.com/design/LTwyKmtsF6Bl7SqieTD5J7

---

## 1. 컴포넌트 매핑 테이블

### GNB (상단 내비게이션 바)

| 구분 | 서비스 내 사용 위치 | 적용된 shadcn 컴포넌트 | 피그마에서 찾는 법 |
| :--- | :--- | :--- | :--- |
| **로고** | GNB 가장 왼쪽, 서비스 브랜드 표시 | SVG 커스텀 | 별도 브랜드 에셋 (SUNi 로고) |
| **메뉴 내비게이션** | '회원 관리'~'문의 응대 관리' 7개 메뉴 | HTML `<a>` 태그 | 피그마 좌측 패널 > **Navigation Menu** 페이지 |
| **도움말 버튼** | GNB 우측, 파란 배경에 'i' 아이콘 + 텍스트 | `Button` | 피그마 좌측 패널 > **Button** 페이지 > Variant: Default |
| **mySUNI/구성원확대 토글** | GNB 우측, 알약형 선택 스위치 | `ToggleGroup` + `ToggleGroupItem` | 피그마 좌측 패널 > **Toggle & Toggle Group** 페이지 |
| **드롭다운 (2개)** | GNB 우측, mySUNi 선택 메뉴 | `Select` + `SelectTrigger` + `SelectContent` + `SelectItem` | 피그마 좌측 패널 > **Select & Combobox** 페이지 |
| **로그아웃** | GNB 가장 오른쪽, 텍스트 + 아이콘 | HTML `<button>` + Lucide `LogOut` 아이콘 | 피그마 > **Icons** 페이지에서 logout 검색 |

### LNB (좌측 사이드 메뉴)

| 구분 | 서비스 내 사용 위치 | 적용된 shadcn 컴포넌트 | 피그마에서 찾는 법 |
| :--- | :--- | :--- | :--- |
| **섹션 구분선** | 카테고리(커리어 서비스 운영관리, Skill 관리 등) 사이 가로줄 | `Separator` | 피그마 좌측 패널 > **Separator** 페이지 |
| **메뉴 항목** | '사내 직무 관리', '조직 및 구성원 관리' 등 개별 메뉴 | HTML `<a>` 태그 (shadcn Sidebar 토큰 참조) | 피그마 좌측 패널 > **Sidebar** 페이지 > Menu Item |

### 본문 (Contents Area)

| 구분 | 서비스 내 사용 위치 | 적용된 shadcn 컴포넌트 | 피그마에서 찾는 법 |
| :--- | :--- | :--- | :--- |
| **대시보드 통계 카드** | 회사명/사업부/팀/리더/팀원/팀 미지정 6칸 요약 | `Card` | 피그마 좌측 패널 > **Card** 페이지 |
| **서브 버튼 (3개)** | '목록', '구성원 추가', '엑셀 업로드' | `Button` (variant: outline) | 피그마 > **Button** 페이지 > Variant: Outline |
| **섹션 타이틀 바** | '[ SK이노베이션 ] 조직 및 구성원 정보' 파란 배경 바 | 커스텀 `<div>` (primary 토큰 적용) | 디자인 토큰 `--primary` (#6684B6) 배경 참조 |

### 조직 트리 (좌측 350px 영역)

| 구분 | 서비스 내 사용 위치 | 적용된 shadcn 컴포넌트 | 피그마에서 찾는 법 |
| :--- | :--- | :--- | :--- |
| **검색창** | 트리 상단, 돋보기 아이콘 + placeholder | `Input` | 피그마 좌측 패널 > **Input & Input Group** 페이지 |
| **조직 관리 버튼** | 트리 상단 우측 | `Button` (variant: outline) | 피그마 > **Button** 페이지 > Variant: Outline |
| **트리 펼침/접힘** | '배터리 사업 기획 본부' 등 클릭 시 하위 조직 표시/숨김 | `Collapsible` + `CollapsibleTrigger` + `CollapsibleContent` | 피그마 좌측 패널 > **Accordion** 페이지 (동일 패턴) |
| **팀 미지정 구성원** | 트리 최하단, 점선 원형 아이콘 포함 | HTML `<button>` + Lucide `CircleDashed` | 피그마 > **Icons** 페이지 > `circle-dashed` |

### 데이터 테이블 (우측 영역)

| 구분 | 서비스 내 사용 위치 | 적용된 shadcn 컴포넌트 | 피그마에서 찾는 법 |
| :--- | :--- | :--- | :--- |
| **테이블 전체** | No/사번/성명/이메일/그룹명/팀명/팀장 데이터 표시 | `Table` + `TableHeader` + `TableBody` + `TableRow` + `TableHead` + `TableCell` | 피그마 좌측 패널 > **Table** 페이지 |
| **행 선택 체크박스** | 각 행 왼쪽 + 헤더 전체선택 | `Checkbox` | 피그마 좌측 패널 > **Checkbox** 페이지 |
| **검색창** | 테이블 상단 우측 | `Input` | 피그마 > **Input & Input Group** 페이지 |
| **구성원 소속 및 리더 설정 버튼** | 테이블 상단 우측 끝 | `Button` (variant: outline) | 피그마 > **Button** 페이지 > Variant: Outline |
| **페이지네이션** | 테이블 하단, 페이지 번호 이동 (1~739) | `Pagination` + `PaginationContent` + `PaginationItem` + `PaginationLink` | 피그마 좌측 패널 > **Pagination** 페이지 |

---

## 2. 아이콘 상세 매핑

기획자가 아이콘을 교체하거나 추가할 때, 아래 라이브러리에서 이름으로 검색하면 됩니다.

### Lucide Icons (https://lucide.dev/icons)

| 아이콘 이름 | 서비스 내 사용 위치 | 시각적 설명 | 검색 키워드 |
| :--- | :--- | :--- | :--- |
| `ChevronDown` | 트리 펼침 상태 (V자 형태) | 아래 방향 꺾쇠 | chevron-down |
| `ChevronRight` | 트리 접힘 상태 (>자 형태) | 오른쪽 방향 꺾쇠 | chevron-right |
| `ChevronLeft` | 페이지네이션 이전 페이지 (<) | 왼쪽 방향 꺾쇠 | chevron-left |
| `ChevronsLeft` | 페이지네이션 맨 처음 (<<) | 왼쪽 이중 꺾쇠 | chevrons-left |
| `ChevronsRight` | 페이지네이션 맨 끝 (>>) | 오른쪽 이중 꺾쇠 | chevrons-right |
| `CircleDashed` | 팀 미지정 구성원 왼쪽 아이콘 | 점선으로 된 원 | circle-dashed |
| `LogOut` | GNB 로그아웃 버튼 옆 | 문에서 나가는 화살표 | log-out |

### Remix Icons (https://remixicon.com)

| 아이콘 이름 | 서비스 내 사용 위치 | 시각적 설명 | 검색 키워드 |
| :--- | :--- | :--- | :--- |
| `ri-search-line` | 트리/테이블 검색창 내부 돋보기 | 얇은 선의 돋보기 | search |
| `ri-home-4-fill` | Breadcrumb 'HOME' 텍스트 왼쪽 | 채워진 집 모양 | home |

### 피그마 Icons 페이지에서 찾기
1. 피그마 파일 열기
2. 좌측 패널에서 **Icons** 페이지 클릭
3. Ctrl+F로 아이콘 이름 검색 (예: `circle-dashed`)
4. 해당 컴포넌트를 드래그하여 디자인에 배치

---

## 3. 컬러 시스템 (디자인 토큰)

피그마 **Colors** 페이지에서 확인 가능합니다. 아래는 서비스에서 실제 사용된 컬러만 정리한 것입니다.

### 주요 사용 컬러

| 용도 | 변수명 | HEX 값 | 피그마 Colors 페이지 위치 |
| :--- | :--- | :--- | :--- |
| **활성화 배경** (토글, 페이지네이션) | `--primary` | `#6684B6` | Blue 스케일 > 500 |
| **GNB 언더라인, 도움말 버튼** | `--sidebar-primary` | `#3B4B7F` | Blue 스케일 > 600 |
| **트리 Active 배경, 버튼 라인/텍스트** | `--secondary-foreground` | `#4B5C92` | General > Secondary Foreground |
| **활성화 위 텍스트** | `--primary-foreground` | `#FFFFFF` | White |
| **본문 배경** | 직접 참조 | `#F3F4FA` | Blue 스케일 > 50 |
| **LNB 호버/Active 배경** | 직접 참조 | `#F3F4FA` | Blue 스케일 > 50 |
| **보더, 구분선** | `--border` | `#DBE2EF` | Blue 스케일 > 200 |
| **기본 텍스트** | `--foreground` | `#262626` | Neutral 스케일 > 800 |
| **비활성 텍스트** | `--muted-foreground` | `#A3A3A3` | Neutral 스케일 > 400 |
| **에러/강조 숫자** | `--destructive` | `#D72337` | Error 스케일 > 600 |
| **테이블 헤더 배경** | `--secondary` | `#FAFAFA` | Neutral 스케일 > 50 |

### 컬러 변경 방법
웹 코드에서 컬러를 바꾸려면 `src/index.css` 파일의 `:root` 섹션에서 해당 변수 값만 수정하면 전체에 자동 반영됩니다.

---

## 4. 타이포그래피

| 용도 | 폰트 | 사이즈 | 굵기 |
| :--- | :--- | :--- | :--- |
| **LNB 최상단 헤더** (Career 관리) | Noto Sans KR | 16px | Bold (700) |
| **LNB 카테고리명** (Skill 관리 등) | Noto Sans KR | 14px | SemiBold (600) |
| **LNB 메뉴 항목** | Noto Sans KR | 14px | Regular (400) / Active: Bold |
| **본문 타이틀** (조직 및 구성원 정보 관리) | Noto Sans KR | 20px | Bold (700) |
| **버튼 텍스트** | Noto Sans KR | 14px | Bold (700) |
| **트리 1Depth** (배터리 사업 기획 본부 등) | Noto Sans KR | 12px | Bold (700) |
| **트리 2Depth** (사업 기획 1팀 등) | Noto Sans KR | 12px | Medium (500) |
| **테이블 헤더** (No, 사번 등) | Noto Sans KR | 13px | Bold (700) |
| **테이블 데이터** | Noto Sans KR | 13px | Regular (400) |
| **Breadcrumb** | Noto Sans KR | 12px | Regular (400) |

---

## 5. 레이아웃 수치

| 영역 | 수치 | 비고 |
| :--- | :--- | :--- |
| **GNB 높이** | 48px | 하단 2px 언더라인 (#3B4B7F) 포함 |
| **LNB 너비** | 280px | 고정, GNB 로고 영역과 동일 |
| **좌측 트리 너비** | 350px | 고정, 상단 컨트롤 바와 수직 정렬 |
| **트리 컨트롤 바 높이** | 60px | 조직명 + Search + 조직관리 버튼 |
| **테이블 컨트롤 바 높이** | 60px | 인원수 + Search + 구성원소속설정 버튼 |
| **트리 항목 간격** | 8px | margin-bottom |
| **팀 미지정 구분선 상하 여백** | 12px | Divider 기준 |
| **타이틀~버튼 영역 간격** | 26px | 설명글 하단 ~ 버튼 영역 |
| **Search 너비 (트리)** | 136px | |
| **Search 너비 (테이블)** | 176px | |

---

## 6. 피그마 페이지 빠른 링크

피그마 파일 열고 좌측 패널에서 아래 페이지명을 클릭하면 바로 이동합니다:

| 페이지명 | 포함된 컴포넌트 |
| :--- | :--- |
| **Colors** | 전체 컬러 팔레트 (Neutral, Blue, Error, Success) |
| **Typography** | 폰트 스타일 가이드 |
| **Icons** | Lucide + Remix 아이콘 전체 |
| **Button** | 버튼 Variants (Default, Outline, Ghost 등) |
| **Toggle & Toggle Group** | 알약형 토글 |
| **Select & Combobox** | 드롭다운 메뉴 |
| **Input & Input Group** | 검색창, 텍스트 입력 |
| **Separator** | 구분선 |
| **Card** | 카드형 컨테이너 |
| **Accordion** | 트리 펼침/접힘 패턴 참고 |
| **Table** | 데이터 테이블 |
| **Data Table** | 고급 테이블 (정렬/필터 포함) |
| **Checkbox** | 체크박스 |
| **Pagination** | 페이지 번호 이동 |
| **Sidebar** | 사이드바 메뉴 |

---

*최종 업데이트: 2026-04-02*
*작성: Claude Code (Obra shadcn_ui kit 기반)*
