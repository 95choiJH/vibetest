#!/usr/bin/env bash
# 빌드 후 CSS+JS를 단일 HTML에 인라인 — 파일명 자동 감지
set -e

npm run build

CSS_FILE=$(ls dist/assets/*.css 2>/dev/null | head -1)
JS_FILE=$(ls dist/assets/*.js 2>/dev/null | head -1)

if [ -z "$CSS_FILE" ] || [ -z "$JS_FILE" ]; then
  echo "Error: dist/assets/ 에서 CSS 또는 JS 파일을 찾을 수 없습니다."
  exit 1
fi

CSS=$(cat "$CSS_FILE")
JS=$(cat "$JS_FILE")

cat > dist/suni-admin-standalone.html << EOF
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>SUNi Admin</title>
    <style>
${CSS}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${JS}
    </script>
  </body>
</html>
EOF

echo "Done: dist/suni-admin-standalone.html"
echo "Size: $(wc -c < dist/suni-admin-standalone.html | tr -d ' ') bytes"
