const MyGonggamPostListPage = () => {
  return (
    <div>
      <strong>OOO♥️님의 공감 게시글</strong>
      <section className="flex flex-col gap-3">
        {/* sample 예시_ 추후 수정*/}
        <div className="border bg-slate-50 p-3">
          <h1>제목 : 한강에 혼자 뛰시는 분들이 많네요</h1>
          <p>내용 : 날씨가 좋아져서 그런지 러닝 갔더니 혼자 뛰시는 분들 많아서 덜 외롭던데요!</p>
          <p>작성자 : 유저닉네임</p>
        </div>
      </section>
    </div>
  );
};

export default MyGonggamPostListPage;
