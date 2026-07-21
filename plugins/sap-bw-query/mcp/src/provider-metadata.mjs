const asString = (value) => (typeof value === "string" && value.trim() !== "" ? value : undefined);

function normalizeInfoObject(item) {
  if (!item || typeof item !== "object") return null;
  const technicalName = asString(item.technicalName) ?? asString(item.name);
  if (!technicalName) return null;
  return {
    technicalName,
    description: asString(item.description) ?? "",
    dimension: asString(item.dimension) ?? asString(item.dimensionName),
    dataType: asString(item.dataType),
    infoObjectType: asString(item.infoObjectType) ?? asString(item.iobjType),
    hierarchies: typeof item.hierarchies === "boolean" ? item.hierarchies : undefined,
  };
}

/**
 * Normalizes a `describeProvider` bridge result into the metadata shape consumed by
 * resolveAndValidateSpec. Tolerates both the enriched response (`{ metadata: {...} }`)
 * and a bare metadata object, and degrades to `{ available: false }` for anything else.
 */
export function normalizeProviderMetadata(bridgeResult) {
  const metadata = bridgeResult && typeof bridgeResult === "object"
    ? (bridgeResult.metadata && typeof bridgeResult.metadata === "object" ? bridgeResult.metadata : bridgeResult)
    : null;
  if (!metadata || metadata.available === false || (!Array.isArray(metadata.characteristics) && !Array.isArray(metadata.keyFigures))) {
    return {
      available: false,
      provider: asString(metadata?.provider) ?? asString(bridgeResult?.provider),
      reason: asString(metadata?.reason) ?? "METADATA_UNAVAILABLE",
      instruction: asString(metadata?.instruction),
    };
  }
  return {
    available: true,
    provider: asString(metadata.provider) ?? asString(bridgeResult?.provider),
    characteristics: (metadata.characteristics ?? []).map(normalizeInfoObject).filter(Boolean),
    keyFigures: (metadata.keyFigures ?? []).map(normalizeInfoObject).filter(Boolean),
    dimensions: (metadata.dimensions ?? [])
      .map((item) => (item && typeof item === "object" && (asString(item.name) || asString(item.technicalName))
        ? { name: asString(item.name) ?? asString(item.technicalName), description: asString(item.description) ?? "" }
        : null))
      .filter(Boolean),
    source: asString(metadata.source),
  };
}
