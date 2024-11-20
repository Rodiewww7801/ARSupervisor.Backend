const { AssetIsAlreadyExist, AssetDosentExist } = require('../errors/index.js');

function Asset(assetRepository) {
  async function addAsset(id, name, description, measurement_unit) {
    const isAssetExist = await assetRepository.getAssetById(id);
    if (isAssetExist) {
      throw new AssetIsAlreadyExist(id);
    }
    const asset = await assetRepository.addAsset(id, name, description, measurement_unit);
    return {
      id: asset.id,
      name: asset.name,
      description: asset.description,
      measurement_unit: asset.measurement_unit
    };
  }

  async function getAssetById(assetId) {
    const asset = await assetRepository.getAssetById(assetId);
    if (!asset) {
      throw new AssetDosentExist(assetId);
    }
    return {
      id: asset.id,
      name: asset.name,
      description: asset.description,
      measurement_unit: asset.measurement_unit
    };
  }

  async function getAssets(offset, limit) {
    let [assets, total] = await assetRepository.getAssets(offset, limit);
    assets = assets.map((asset) => {
      return {
        id: asset.id,
        name: asset.name,
        description: asset.description,
        measurement_unit: asset.measurement_unit
      };
    });
    return [assets, total];
  }


  return {
    addAsset,
    getAssetById,
    getAssets,
  };
}

module.exports = Asset;
