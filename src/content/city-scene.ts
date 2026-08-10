import alignment from "../../city_alignment_output/alignment.json";
import { getCityDestination } from "@/content/city-destinations";

const normalizeAssetPath = (path: string) => path.replaceAll("\\", "/");

/**
 * Canonical runtime model for one complete city export.
 * Alignment records, image paths, and destinations are joined by asset ID so
 * the component can never mix placement data from separate exports.
 */
export const cityScene = {
  base: {
    src: `/city/${normalizeAssetPath(alignment.base.file)}`,
    width: alignment.base.widthPx,
    height: alignment.base.heightPx,
  },
  layers: alignment.assets.map((asset) => {
    const destination = getCityDestination(asset.id);

    if (!destination) {
      throw new Error(`Missing city destination metadata for asset ${asset.id}.`);
    }

    return {
      id: asset.id,
      src: `/city/${normalizeAssetPath(asset.assetFile)}`,
      label: destination.label,
      slug: destination.slug,
      href: destination.href,
      placement: {
        left: asset.leftPct,
        top: asset.topPct,
        width: asset.widthPct,
        height: asset.heightPct,
      },
    };
  }),
};

export type CityScene = typeof cityScene;
