import type { NewsArticle } from "@/data/news";
import type { Program } from "@/data/programs";
import type { FacultyMember } from "@/data/faculty";

/**
 * Lấy URL Google Sheets hoặc Google Apps Script từ biến môi trường
 */
export function getGoogleSheetApiUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SHEET_URL ||
    ""
  ).trim();
}

/**
 * Chuẩn hóa định dạng ngày
 */
export function formatSheetDate(rawDate: unknown): string {
  if (!rawDate) return "";
  const str = String(rawDate).trim();
  if (str.includes("T") && str.endsWith("Z")) {
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }
  return str;
}

function normalizeNewsCategory(rawCat: unknown): NewsArticle["category"] {
  const val = String(rawCat || "").trim().toLowerCase();
  if (
    val === "scholarship" ||
    val.includes("học bổng") ||
    val.includes("hoc bong") ||
    val.includes("奖学金")
  ) {
    return "scholarship";
  }
  if (
    val === "event" ||
    val.includes("sự kiện") ||
    val.includes("su kien") ||
    val.includes("活动")
  ) {
    return "event";
  }
  return "announcement";
}

export function normalizeNewsRow(
  raw: Record<string, unknown>,
  index = 0
): NewsArticle {
  const title = String(raw.title || raw["title VI"] || raw.titleVi || "").trim();
  const titleEn = String(raw.titleEn || raw["title EN"] || title).trim();
  const titleZh = String(raw.titleZh || raw["title ZH"] || title).trim();

  const excerpt = String(
    raw.excerpt || raw["excerpt VI"] || raw.excerptVi || ""
  ).trim();
  const excerptEn = String(raw.excerptEn || raw["excerpt EN"] || excerpt).trim();
  const excerptZh = String(raw.excerptZh || raw["excerpt ZH"] || excerpt).trim();

  const content = String(
    raw.content || raw["content VI"] || raw.contentVi || excerpt
  ).trim();
  const contentEn = String(
    raw.contentEn || raw["content EN"] || content
  ).trim();
  const contentZh = String(
    raw.contentZh || raw["content ZH"] || content
  ).trim();

  const slug = String(raw.slug || `tin-tuc-${index + 1}`)
    .trim()
    .replace(/^\/+|\/+$/g, "");

  return {
    slug,
    title,
    titleEn,
    titleZh,
    excerpt,
    excerptEn,
    excerptZh,
    content,
    contentEn,
    contentZh,
    category: normalizeNewsCategory(raw.category),
    rawCategoryLabel: raw.category ? String(raw.category).trim() : undefined,
    date: formatSheetDate(raw.date),
    image: String(
      raw.image || `/images/placeholder/news-${(index % 4) + 1}.jpg`
    ),
    featured:
      raw.featured === true ||
      String(raw.featured).trim().toLowerCase() === "true",
  };
}

const defaultProgramImages: Record<string, string> = {
  "hoc-bong-chinh-phu-trung-quoc-csc": "/images/programs/campus-beijing.jpg",
  "hoc-bong-giao-vien-han-ngu-cis": "/images/programs/campus-shanghai.jpg",
  "dao-tao-han-ngu-luyen-thi-hsk": "/images/programs/campus-hsk.jpg",
  "hoc-bong-vanh-dai-va-con-duong": "/images/programs/campus-belt-road.jpg",
  "hoc-bong-thanh-pho-thuong-hai-sgs": "/images/programs/campus-sgs.jpg",
  "chuong-trinh-trao-doi-viet-trung": "/images/programs/campus-exchange.jpg",
};

const fallbackImagesList = [
  "/images/programs/campus-beijing.jpg",
  "/images/programs/campus-shanghai.jpg",
  "/images/programs/campus-hsk.jpg",
  "/images/programs/campus-belt-road.jpg",
  "/images/programs/campus-sgs.jpg",
  "/images/programs/campus-exchange.jpg",
  "/images/programs/campus-wuhan.jpg",
  "/images/programs/campus-guangzhou.jpg",
];

export function normalizeProgramRow(
  raw: Record<string, unknown>,
  index = 0
): Program {
  const title = String(raw.title || raw["title VI"] || "").trim();
  const titleEn = String(raw.titleEn || raw["title EN"] || title).trim();
  const titleZh = String(raw.titleZh || raw["title ZH"] || title).trim();

  const description = String(
    raw.description || raw["description VI"] || ""
  ).trim();
  const descriptionEn = String(
    raw.descriptionEn || raw["description EN"] || description
  ).trim();
  const descriptionZh = String(
    raw.descriptionZh || raw["description ZH"] || description
  ).trim();

  let features: string[] = [];
  if (Array.isArray(raw.features)) {
    features = raw.features.map((f) => String(f).trim()).filter(Boolean);
  } else if (raw.features) {
    features = String(raw.features)
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
  }

  const rawCat = String(raw.category || "korean").trim().toLowerCase();
  let category: Program["category"] = "korean";
  if (rawCat === "japanese" || rawCat === "cis") category = "japanese";
  else if (rawCat === "exchange") category = "exchange";

  const slug = String(raw.slug || `chuong-trinh-${index + 1}`)
    .trim()
    .replace(/^\/+|\/+$/g, "");

  const rawImage = String(raw.image || "").trim();
  const resolvedImage =
    rawImage && !rawImage.includes("placeholder")
      ? rawImage
      : defaultProgramImages[slug] ||
        fallbackImagesList[index % fallbackImagesList.length];

  return {
    slug,
    title,
    titleEn,
    titleZh,
    category,
    description,
    descriptionEn,
    descriptionZh,
    duration: String(raw.duration || "").trim(),
    image: resolvedImage,
    features,
    badgeVi: raw.badgeVi ? String(raw.badgeVi).trim() : undefined,
    badgeZh: raw.badgeZh ? String(raw.badgeZh).trim() : undefined,
    locationVi: raw.locationVi ? String(raw.locationVi).trim() : undefined,
    locationZh: raw.locationZh ? String(raw.locationZh).trim() : undefined,
  };
}

export function normalizeFacultyRow(
  raw: Record<string, unknown>,
  index = 0
): FacultyMember {
  const name = String(raw.name || raw["name VI"] || "").trim();
  return {
    name,
    nameEn: String(raw.nameEn || raw["name EN"] || name).trim(),
    nameZh: String(raw.nameZh || raw["name ZH"] || name).trim(),
    title: String(raw.title || raw["title VI"] || "").trim(),
    titleEn: String(raw.titleEn || raw["title EN"] || "").trim(),
    titleZh: String(raw.titleZh || raw["title ZH"] || "").trim(),
    bio: String(raw.bio || raw["bio VI"] || "").trim(),
    bioEn: String(raw.bioEn || raw["bio EN"] || "").trim(),
    bioZh: String(raw.bioZh || raw["bio ZH"] || "").trim(),
    image: String(
      raw.image || `/images/placeholder/faculty-${(index % 3) + 1}.jpg`
    ).trim(),
    specialization: String(
      raw.specialization || raw["specialization VI"] || ""
    ).trim(),
    specializationZh: String(
      raw.specializationZh ||
        raw["specialization ZH"] ||
        raw.specialization ||
        ""
    ).trim(),
  };
}

// Bộ nhớ đệm (Cache)
let cachedNews: NewsArticle[] | null = null;
let inflightNews: Promise<NewsArticle[]> | null = null;

let cachedPrograms: Program[] | null = null;
let inflightPrograms: Promise<Program[]> | null = null;

let cachedFaculty: FacultyMember[] | null = null;
let inflightFaculty: Promise<FacultyMember[]> | null = null;

function readStorageCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.data) && parsed.data.length > 0) {
      return parsed.data as T;
    }
  } catch {
    // Ignore storage read errors
  }
  return null;
}

function writeStorageCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // Ignore storage errors
  }
}

/**
 * Trình phân tích CSV chuẩn từ Google Sheets
 */
function parseCsvRows(csvText: string): Record<string, string>[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      if (h) row[h] = values[idx] || "";
    });
    return row;
  });
}

/**
 * Hàm chung nạp dữ liệu từ Google Sheets:
 * Hỗ trợ cả Link trực tiếp Google Sheet (/spreadsheets/d/ID) và Link Google Apps Script (/exec)
 */
export async function fetchRawSheetRows(
  sheetName: string
): Promise<Record<string, unknown>[]> {
  const apiUrl = getGoogleSheetApiUrl();
  if (!apiUrl) return [];

  // Cách 1: Link trực tiếp Google Sheet (https://docs.google.com/spreadsheets/d/ID/...)
  const match = apiUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    const spreadsheetId = match[1];
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
      sheetName
    )}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return [];
      const text = await res.text();
      // Nếu trả về HTML đăng nhập thì file đang bị đặt Private
      if (
        text.includes("<!DOCTYPE") ||
        text.includes("<html") ||
        text.includes("ServiceLogin")
      ) {
        console.warn(
          `Google Sheet tab "${sheetName}" chưa bật quyền "Bất kỳ ai có liên kết đều xem được".`
        );
        return [];
      }
      return parseCsvRows(text);
    } catch (err) {
      console.error(`Lỗi tải tab "${sheetName}" qua Google Sheet trực tiếp:`, err);
      return [];
    }
  }

  // Cách 2: Link Google Apps Script (/exec)
  try {
    const sep = apiUrl.includes("?") ? "&" : "?";
    const res = await fetch(`${apiUrl}${sep}sheet=${encodeURIComponent(sheetName)}`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
  } catch (err) {
    console.error(`Lỗi tải tab "${sheetName}" qua Apps Script:`, err);
    return [];
  }
}

/**
 * Gọi dữ liệu tab `news`
 */
export async function fetchNewsFromSheet(): Promise<NewsArticle[]> {
  if (inflightNews) return inflightNews;

  inflightNews = (async () => {
    try {
      const rows = await fetchRawSheetRows("news");
      if (rows.length === 0) return cachedNews || [];

      const result = rows
        .filter((r) => r && (r.slug || r.title || r["title VI"]))
        .map((r, idx) => normalizeNewsRow(r, idx));
      if (result.length > 0) {
        cachedNews = result;
        writeStorageCache("cache_sheet_news", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab news từ Google Sheets:", err);
      return cachedNews || [];
    } finally {
      inflightNews = null;
    }
  })();

  return inflightNews;
}

/**
 * Gọi dữ liệu tab `programs`
 */
export async function fetchProgramsFromSheet(): Promise<Program[]> {
  if (inflightPrograms) return inflightPrograms;

  inflightPrograms = (async () => {
    try {
      const rows = await fetchRawSheetRows("programs");
      if (rows.length === 0) return cachedPrograms || [];

      const result = rows
        .filter((r) => r && (r.slug || r.title || r["title VI"]))
        .map((r, idx) => normalizeProgramRow(r, idx));
      if (result.length > 0) {
        cachedPrograms = result;
        writeStorageCache("cache_sheet_programs", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab programs từ Google Sheets:", err);
      return cachedPrograms || [];
    } finally {
      inflightPrograms = null;
    }
  })();

  return inflightPrograms;
}

/**
 * Gọi dữ liệu tab `faculty`
 */
export async function fetchFacultyFromSheet(): Promise<FacultyMember[]> {
  if (inflightFaculty) return inflightFaculty;

  inflightFaculty = (async () => {
    try {
      const rows = await fetchRawSheetRows("faculty");
      if (rows.length === 0) return cachedFaculty || [];

      const result = rows
        .filter((r) => r && (r.name || r["name VI"]))
        .map((r, idx) => normalizeFacultyRow(r, idx));
      if (result.length > 0) {
        cachedFaculty = result;
        writeStorageCache("cache_sheet_faculty", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab faculty từ Google Sheets:", err);
      return cachedFaculty || [];
    } finally {
      inflightFaculty = null;
    }
  })();

  return inflightFaculty;
}

// ==========================================
// CÁC HÀM TẢI DỮ LIỆU ĐỘNG TỪ GOOGLE SHEETS
// CHO STATS, TIMELINE, PARTNERS, SITE_CONFIG
// ==========================================

export interface StatItemData {
  key: string;
  value: number;
  suffix: string;
  label_vi: string;
  label_zh: string;
}

export interface TimelineStepData {
  step: string;
  tag_vi: string;
  tag_zh: string;
  location_vi: string;
  location_zh: string;
  title_vi: string;
  title_zh: string;
  desc_vi: string;
  desc_zh: string;
  highlights_vi: string[];
  highlights_zh: string[];
  image: string;
}

export interface PartnerData {
  id: string;
  name_vi: string;
  name_zh: string;
  location: string;
  rank: string;
}

export interface SiteConfigItem {
  key: string;
  name: string;
  value_vi: string;
  value_zh: string;
}

let cachedStats: StatItemData[] | null = null;
let inflightStats: Promise<StatItemData[]> | null = null;

export function getCachedStats(): StatItemData[] | null {
  if (cachedStats && cachedStats.length > 0) return cachedStats;
  const storage = readStorageCache<StatItemData[]>("cache_sheet_stats");
  if (storage && storage.length > 0) {
    cachedStats = storage;
    return storage;
  }
  return null;
}

export async function fetchStatsFromSheet(): Promise<StatItemData[]> {
  if (inflightStats) return inflightStats;

  inflightStats = (async () => {
    try {
      const rows = await fetchRawSheetRows("stats");
      if (rows.length === 0) return cachedStats || [];

      const result: StatItemData[] = rows
        .filter((r) => r && (r.value !== undefined || r.label_vi))
        .map((r, idx) => ({
          key: String(r.key || `stat_${idx + 1}`).trim(),
          value: Number(r.value) || 0,
          suffix: String(r.suffix || "+").trim(),
          label_vi: String(r.label_vi || r.label || "").trim(),
          label_zh: String(r.label_zh || r.label_vi || "").trim(),
        }));

      if (result.length > 0) {
        cachedStats = result;
        writeStorageCache("cache_sheet_stats", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab stats từ Google Sheets:", err);
      return cachedStats || [];
    } finally {
      inflightStats = null;
    }
  })();

  return inflightStats;
}

let cachedTimeline: TimelineStepData[] | null = null;
let inflightTimeline: Promise<TimelineStepData[]> | null = null;

export async function fetchTimelineFromSheet(): Promise<TimelineStepData[]> {
  if (inflightTimeline) return inflightTimeline;

  inflightTimeline = (async () => {
    try {
      const rows = await fetchRawSheetRows("timeline");
      if (rows.length === 0) return cachedTimeline || [];

      const result: TimelineStepData[] = rows
        .filter((r) => r && (r.step || r.title_vi))
        .map((r, idx) => {
          const parseList = (val: unknown): string[] => {
            if (Array.isArray(val)) return val.map((x) => String(x).trim()).filter(Boolean);
            if (typeof val === "string") return val.split(",").map((x) => x.trim()).filter(Boolean);
            return [];
          };

          return {
            step: String(r.step || `0${idx + 1}`).padStart(2, "0"),
            tag_vi: String(r.tag_vi || `GIAI ĐOẠN 0${idx + 1}`).trim(),
            tag_zh: String(r.tag_zh || `阶段 0${idx + 1}`).trim(),
            location_vi: String(r.location_vi || "").trim(),
            location_zh: String(r.location_zh || "").trim(),
            title_vi: String(r.title_vi || "").trim(),
            title_zh: String(r.title_zh || r.title_vi || "").trim(),
            desc_vi: String(r.desc_vi || "").trim(),
            desc_zh: String(r.desc_zh || r.desc_vi || "").trim(),
            highlights_vi: parseList(r.highlights_vi),
            highlights_zh: parseList(r.highlights_zh || r.highlights_vi),
            image: String(r.image || `/images/landscapes/china-beijing.jpg`).trim(),
          };
        });

      if (result.length > 0) {
        cachedTimeline = result;
        writeStorageCache("cache_sheet_timeline", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab timeline từ Google Sheets:", err);
      return cachedTimeline || [];
    } finally {
      inflightTimeline = null;
    }
  })();

  return inflightTimeline;
}

let cachedPartners: PartnerData[] | null = null;
let inflightPartners: Promise<PartnerData[]> | null = null;

export async function fetchPartnersFromSheet(): Promise<PartnerData[]> {
  if (inflightPartners) return inflightPartners;

  inflightPartners = (async () => {
    try {
      const rows = await fetchRawSheetRows("partners");
      if (rows.length === 0) return cachedPartners || [];

      const result: PartnerData[] = rows
        .filter((r) => r && (r.name_vi || r.name))
        .map((r, idx) => ({
          id: String(r.id || `partner_${idx + 1}`).trim(),
          name_vi: String(r.name_vi || r.name || "").trim(),
          name_zh: String(r.name_zh || r.name_vi || "").trim(),
          location: String(r.location || "").trim(),
          rank: String(r.rank || "").trim(),
        }));

      if (result.length > 0) {
        cachedPartners = result;
        writeStorageCache("cache_sheet_partners", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab partners từ Google Sheets:", err);
      return cachedPartners || [];
    } finally {
      inflightPartners = null;
    }
  })();

  return inflightPartners;
}

let cachedSiteConfig: Record<string, SiteConfigItem> | null = null;
let inflightSiteConfig: Promise<Record<string, SiteConfigItem>> | null = null;

export async function fetchSiteConfigFromSheet(): Promise<Record<string, SiteConfigItem>> {
  if (inflightSiteConfig) return inflightSiteConfig;

  inflightSiteConfig = (async () => {
    try {
      const rows = await fetchRawSheetRows("site_config");
      if (rows.length === 0) return cachedSiteConfig || {};

      const result: Record<string, SiteConfigItem> = {};
      rows.forEach((r) => {
        if (r && r.key) {
          const key = String(r.key).trim();
          result[key] = {
            key,
            name: String(r.name || key).trim(),
            value_vi: String(r.value_vi || r.value || "").trim(),
            value_zh: String(r.value_zh || r.value_vi || "").trim(),
          };
        }
      });

      if (Object.keys(result).length > 0) {
        cachedSiteConfig = result;
        writeStorageCache("cache_sheet_site_config", result);
      }
      return result;
    } catch (err) {
      console.error("Lỗi khi tải tab site_config từ Google Sheets:", err);
      return cachedSiteConfig || {};
    } finally {
      inflightSiteConfig = null;
    }
  })();

  return inflightSiteConfig;
}
