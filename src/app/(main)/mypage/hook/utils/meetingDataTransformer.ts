import { type MeetingItem, type BookMarkItem } from '../../utils/mypageType';

type PageChunk = {
  data: {
    content: Array<MeetingItem | BookMarkItem>;
  };
};

function isMeetingItem(item: MeetingItem | BookMarkItem): item is MeetingItem {
  return 'reviewStatus' in item && 'tags' in item;
}

export function transformMeetingItems(
  pages: ReadonlyArray<PageChunk>,
  hideCompletedReviews: boolean,
): MeetingItem[] {
  if (pages.length === 0) return [];

  const allItems = pages.reduce<Array<MeetingItem | BookMarkItem>>((acc, p) => {
    return acc.concat(p.data.content ?? []);
  }, []);

  let normalized: MeetingItem[] = allItems.map((item) => {
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

  const seen = new Set<number>();
  normalized = normalized.filter((it) => {
    if (seen.has(it.groupId)) return false;
    seen.add(it.groupId);
    return true;
  });

  if (hideCompletedReviews) {
    normalized = normalized.filter((it) => {
      const { reviewedCount, totalCount } = it.reviewStatus;
      return !(totalCount > 0 && reviewedCount >= totalCount);
    });
  }

  return normalized;
}
