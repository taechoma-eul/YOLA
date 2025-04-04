import MypageProgressBar from '@/components/features/mypage/mypage-progressbar';
import { getUserMetadata } from '@/lib/utils/api/auth-action';
import { getUserMission, getUserMissionLevels } from '@/lib/utils/api/my-mission.api';
import { calculateUserLevel } from '@/lib/utils/calculate-user-level';

const AchievementPage = async () => {
  //유저 전체 레벨 계산 로직 -> progressBar 에 Props 전달
  const user = await getUserMetadata();
  const missions = await getUserMission();
  const totalCount = [...missions].length;
  const userLevel = calculateUserLevel(totalCount);

  //유저 미션 레벨 조회 : 5개 (혼밥,혼자여행,갓생,혼놀,청소)
  const userMissionLevels = await getUserMissionLevels();

  //레벨 표기 _ (Lv.1,Lv.2,Lv.3,Lv.4,Lv.5,master)
  const formatLevel = (level: string) => (level === 'master' ? 'master' : `Lv.${level}`);

  /// 미션 카테고리 목록 _ description은 추후 수정 예정
  const categories = [
    { name: '혼밥', level: userMissionLevels.meal, description: '혼자서 밥 먹기 미션을 수행해보세요!' },
    { name: '혼자여행', level: userMissionLevels.travel, description: '혼자 여행을 떠나는 도전을 해보세요!' },
    { name: '갓생', level: userMissionLevels.goat, description: '자기 계발과 성장에 집중하는 라이프 스타일!' },
    { name: '혼놀', level: userMissionLevels.play, description: '혼자서도 재미있게 노는 방법을 찾아보세요!' },
    { name: '청소', level: userMissionLevels.clean, description: '청소 습관을 만들고 깔끔한 공간을 유지하세요!' }
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* 전체 레벨 5단계 */}
      <strong>{user?.nickname}님의 혼자 라이프 레벨</strong>
      <MypageProgressBar level={userLevel} />

      {/* 각각의 미션 카테고리 level 현황 */}
      <strong>{user?.nickname}님의 체크리스트 달성도</strong>
      <section className="flex gap-3 rounded-md border border-slate-200 p-3">
        {categories.map(({ name, level, description }) => (
          <div
            key={name}
            className="group relative flex flex-col items-center justify-center rounded-md p-3 transition-colors duration-200 hover:bg-gray-200"
          >
            {/* 카테고리명 */}
            <div className="cursor-pointer">{name}</div>
            {/* 레벨 표시 */}
            <div>{formatLevel(level)}</div>
            <div className="text-orange-500">1/5</div>
            {/* Hover 시 나타나는 툴팁 */}
            <div className="absolute -bottom-14 hidden w-48 rounded-md bg-orange-600 p-2 text-sm text-white shadow-lg group-hover:block">
              {description}
            </div>
          </div>
        ))}
      </section>

      {/* 렌덤 미션 뽑기 _ 모달 설치 필요 */}
      <div className="flex justify-between">
        <strong>오늘의 랜덤 미션</strong>
        <button>미션 받으러 가기</button>
      </div>
      <section className="bg-slate-200 p-3">
        <p>아직 랜덤 미션을 받지 않았어요. 랜덤 미션을 받으러 가볼까요?</p>
        <p>랜덤 미션은 포인트가 두배에요!</p>
      </section>
    </div>
  );
};

export default AchievementPage;
