const WHY_DATA = [
  'Bạn còn có cơ hội nhận được các phần quà giá trị từ quỹ học bổng của công ty tu vấn SFMS.',
  'Quy trình làm việc minh bạch, luôn tôn trọng và đặt lợi ích của khách hàng lên hàng đầu',
  'Đội ngũ chuyên viên tư vấn chuyên môn cao, xây dựng lộ trình giáo dục tốt nhất, tận tình giải đáp 24/7',
  'Hướng dẫn làm hồ sơ chứng minh tài chính, xin visa với tỷ lệ đạt cao, săn học bổng giá trị lên đến 100%',
  'Cung cấp dịch vụ luyện tập phỏng vấn và chứng chỉ được thu thập từ các nguồn uy tín trên thế giới .',
  'Giữ kết nối, chăm sóc và hỗ trợ học sinh trước khi bay, trong khi bay và sau khi bay',
];
const FEATURE_DATA = [
  {
    img: '/images/element05.svg',
    title: 'Đội ngũ tư vấn chuyên nghiệp, tận tâm',
  },
  {
    img: '/images/element06.svg',
    title: 'Chương trình học bổng phù hợp',
  },
  {
    img: '/images/element07.svg',
    title: 'Đối tác của hơn 1.000+ trường trên thế giới',
  },
  {
    img: '/images/element08.svg',
    title: 'Cập nhật học bổng mới nhất liên tục ',
  },
];
const STEP_DATA = [
  {
    img: '/images/step2.svg',
    title: 'Nhận tư vấn',
  },
  {
    img: '/images/step1.svg',
    title: 'Thanh toán phí nộp hồ sơ',
  },
  {
    img: '/images/step3.svg',
    title: 'Sửa hồ sơ',
  },
  {
    img: '/images/step4.svg',
    title: 'Thanh toán phí hoàn chỉnh hồ sơ',
  },
  {
    img: '/images/step5.svg',
    title: 'Nhận học bổng ',
  },
];
const PROFIT_DATA = [
  'Được tư vấn miễn phí về học bổng và du học.',

  'Staff sửa hồ sơ cho ứng viên cho đến khi hoàn hảo. ',

  'Được SFMS hỗ trợ nộp hồ sơ xin học bổng .',

  'Được làm các bài kiểm tra luyện tập để thi chứng chỉ cũng như những câu hỏi phỏng vấn .',
];

const REVIEW_DATA = [
  {
    name: 'Nguyễn Thị Hồng',
    university: 'Southern Cross University',
    content:
      'SFMS là một trang web cực kỳ hữu ích! Tôi đã tìm thấy rất nhiều cơ hội học bổng phù hợp với mình mà trước đây chưa bao giờ biết đến. Giao diện dễ sử dụng và các bộ lọc rất chi tiết giúp tôi tiết kiệm nhiều thời gian. Cảm ơn SFMS đã giúp tôi tiến gần hơn đến ước mơ du học!',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Maria',
  },
  {
    name: 'Lê Văn Hùng',
    university: 'University of Melbourne',
    content:
      '"Tôi rất ấn tượng với SFMS! Trang web luôn cập nhật các học bổng mới nhất và thông tin chi tiết về từng chương trình. Điều làm tôi thích nhất là cách họ cá nhân hóa các đề xuất dựa trên hồ sơ của tôi. Đây là nguồn tài nguyên không thể thiếu cho bất kỳ ai đang tìm kiếm cơ hội học bổng."',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Scoot',
  },
  {
    name: 'Nguyễn Thiên Phúc',
    university: 'University of Sydney',
    content:
      '"Tôi rất ấn tượng với SFMS! Trang web luôn cập nhật các học bổng mới nhất và thông tin chi tiết về từng chương trình. Điều làm tôi thích nhất là cách họ cá nhân hóa các đề xuất dựa trên hồ sơ của tôi. Đây là nguồn tài nguyên không thể thiếu cho bất kỳ ai đang tìm kiếm cơ hội học bổng."',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Stand',
  },
  {
    name: 'Nguyễn Thị Hồng',
    university: 'Southern Cross University',
    content:
      '"Trang web SFMS không chỉ cung cấp thông tin học bổng rõ ràng mà còn hỗ trợ tôi trong việc chuẩn bị hồ sơ. Các hướng dẫn và mẹo mà trang cung cấp thực sự rất giá trị. Nhờ SFMS, tôi đã thành công nhận được học bổng toàn phần cho chương trình thạc sĩ ở nước ngoài. Rất đáng tin cậy!"',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Maria',
  },
  {
    name: 'Nguyễn Thị Hồng',
    university: 'Southern Cross University',
    content:
      '"Trang web SFMS không chỉ cung cấp thông tin học bổng rõ ràng mà còn hỗ trợ tôi trong việc chuẩn bị hồ sơ. Các hướng dẫn và mẹo mà trang cung cấp thực sự rất giá trị. Nhờ SFMS, tôi đã thành công nhận được học bổng toàn phần cho chương trình thạc sĩ ở nước ngoài. Rất đáng tin cậy!"',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Maria',
  },
];
const FAQ_DATA = [
  {
    question: 'Hồ sơ đi du học cần nộp những gì ?',
    answer:
      'Giấy tờ cá nhân cần phải nộp : Hộ Chiếu, giấy giới thiệu bản thân, sơ hiếu lý lịch, hộ khẩu, giấy khai sinh, giấy xác nhận học sinh , sinh viên (nếu còn đang đi học ),thư giới thiệu của giáo sư hoặc những người có chức vụ cao trong trường học , chứng chỉ ngoại ngữ về đất nước bạn du học(IELTS, TOEFL, JLPT, KICE,..) , Chứng chỉ đặc biệt (SAT/ACT, GMAT/GRE,..), Hồ sơ chứng minh thu nhập tài chính(Sổ tiết kiệm, giấy xác nhận số dư tài khoản ngân hàng, nghề nghiệp và thu nhập cá nhân,...), ...',
  },
  {
    question: 'Quá trình nộp hồ sơ sẽ mất bao lâu?',
    answer:
      'Quá trình xét duyệt hồ sơ của các trường đại học thường rất khác nhau và thay đổi theo từng năm học . Việc liên tục cập nhật thông tin từ nhân viên tư vấn của chúng tôi sẽ giúp bạn dễ dàng chuẩn bị tinh thần và kế hoạch cho những bước tiếp theo , nhưng thường thì 1 hồ sơ sẽ mất khoảng thời gian là từ 6 tháng đến 1 năm .',
  },
  {
    question: 'Nên đi du học ở độ tuổi nào?',
    answer: `Các thời điểm có thể đi du học là :
Du học ngay khi bạn đang học THPT . Thời điểm này sẽ có ưu điểm là bạn sẽ tiếp xúc với môi trường sớm hơn, bạn được hưởng thụ đẩy đủ môi trường giáo dục đẳng cấp quốc tế.
Du học ngay khi bạn tốt nghhiệp THPT: khi đủ 18 tuổi, tính tự chủ của bạn sẽ cao hơn , gia đình bớt lo lắng hơn. Thời điểm này được coi là thời điểm vàng để bắt đầu hòa nhập môi trường mới. Bên cạnh đó có rất nhiều trường đại học được chúng tôi cập nhật cho bạn dễ dàng lựa chọn
Du học sau khi tốt nghiệp ĐH : Sau khi học đại học trong nước , đi du học để lấy bằng sau ĐH hoặc thạc sỹ. Bạn đủ tuổi để quyết định con đường và chương trình học như thế nào đúng đắn và phù hợp với bản thân mình. Chương trình học này sẽ là bước đệm cho dự đinh công việc hay định cư.`,
  },
];

export { FAQ_DATA, FEATURE_DATA, PROFIT_DATA, REVIEW_DATA, STEP_DATA, WHY_DATA };
