import { type MeetingItem, type BookMarkItem } from '../../utils/mypageType';

type PageChunk = {
  data: {
    content: Array<MeetingItem | BookMarkItem>;
  };
};

function isMeetingItem(item: MeetingItem | BookMarkItem): item is MeetingItem {
  return 'reviewStatus' in item && 'tags' in item;
}

// 무한스크롤 API 응답을 통일된 MeetingItem 배열로 변환
export function transformMeetingItems(
  pages: ReadonlyArray<PageChunk>,
  hideCompletedReviews: boolean,
): MeetingItem[] {
  if (pages.length === 0) return [];

  // 모든 페이지의 content 배열을 하나로 합치기
  const flattenedItems = pages.reduce<Array<MeetingItem | BookMarkItem>>(
    (acc, page) => {
      return acc.concat(page.data.content ?? []);
    },
    [],
  );

  // 북마크 아이템에 기본값 부여하여 통일된 형태로 변환
  let unifiedItems: MeetingItem[] = flattenedItems.map((item) => {
    const base = {
      groupId: item.groupId,
      title: item.title,
      category: item.category,
      status: item.status,
      usageStatus: item.usageStatus,
      location: item.location,
      thumbnailUrl: item.thumbnailUrl,
      createdAt: item.createdAt,
      bookmarked: item.bookmarked,
      hostName: item.hostName,
    };

    if (isMeetingItem(item)) {
      return {
        ...base,
        storage: item.storage ?? [],
        reviewStatus: item.reviewStatus,
        tags: item.tags,
      };
    }

    return {
      ...base,
      storage: item.storage ?? [],
      reviewStatus: { reviewedCount: 0, totalCount: 0 },
      tags: [],
    };
  });

  // 중복 제거 (groupId 기준)
  const seenGroupIds = new Set<number>();
  unifiedItems = unifiedItems.filter((item) => {
    if (seenGroupIds.has(item.groupId)) return false;
    seenGroupIds.add(item.groupId);
    return true;
  });

  // 리뷰 완료 필터링
  if (hideCompletedReviews) {
    unifiedItems = unifiedItems.filter((item) => {
      const { reviewedCount, totalCount } = item.reviewStatus;
      return !(totalCount > 0 && reviewedCount >= totalCount);
    });
  }

  return unifiedItems;
}
