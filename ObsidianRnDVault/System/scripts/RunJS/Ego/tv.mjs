/**
 * @RunJS Ego/tv
 */

// in vault at RunJS Scripts/tv.mjs

export function groupBySeries(data) {
  return data.reduce((acc, episode) => {
    const seriesId = episode.series.id;
    if (!acc[seriesId]) {
      acc[seriesId] = {
        seriesInfo: episode.series,
        episodes: [],
      };
    }
    acc[seriesId].episodes.push(episode);
    return acc;
  }, {});
}

export function sortEpisodes(groupedData) {
  for (let seriesId in groupedData) {
    groupedData[seriesId].episodes.sort((a, b) => {
      if (a.seasonNumber !== b.seasonNumber) {
        return a.seasonNumber - b.seasonNumber;
      }
      return a.episodeNumber - b.episodeNumber;
    });
  }
}

export function generateMarkdown(groupedData) {
  const markdownPages = {};

  for (let seriesId in groupedData) {
    const seriesInfo = groupedData[seriesId].seriesInfo;
    const episodes = groupedData[seriesId].episodes;

    let markdown = `# ${seriesInfo.title}\n\n`;
    markdown += `![${seriesInfo.title}](${
      seriesInfo.images.find((img) => img.coverType === "poster").url
    })\n\n`;
    markdown += `${seriesInfo.overview}\n\n`;
    markdown += "## Episodes\n\n";

    episodes.forEach((ep) => {
      markdown += `### Season ${ep.seasonNumber} Episode ${ep.episodeNumber}: ${ep.title}\n`;
      markdown += `${ep.airDate}: ${ep.overview}\n\n`;
    });

    markdownPages[seriesInfo.titleSlug] = markdown;
  }

  return markdownPages;
}
