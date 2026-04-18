function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-700">UpNext AI</p>
          <p>주가 예측 기반 뉴스 분석 플랫폼</p>
        </div>

        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-700">
            이용약관
          </a>
          <a href="#" className="hover:text-gray-700">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-gray-700">
            문의
          </a>
        </div>

        <div className="text-xs text-gray-400">
          © 2026 UpNext. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
