function Client(clientRepository) {
  async function createClient(id, label, secret, grants) {
    const client = await clientRepository.addClient(id, secret, label, grants);
    if (!client) {
      return null;
    }
    return {
      id: client.id,
      secret: client.secret,
      label: client.label,
      grants: client.grants
    };
  }

  async function getClientById(clientId) {
    const client = await clientRepository.getClientById(clientId);
    if (!client) {
      return null;
    }
    return {
      id: client.id,
      secret: client.secret,
      label: client.label,
      grants: client.grants
    }
  }

  return {
    createClient,
    getClientById
  }
}

module.exports = Client;
