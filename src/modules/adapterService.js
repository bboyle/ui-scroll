let adapterList = [];
let count = 0;

function findAdapter(list, property, value, returnType = 'adapter') {
  if (value) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i][property] === value) {
        return returnType === 'index' ? i : list[i];
      }
    }
  }
  return returnType === 'index' ? -1 : null;
}

class PublicAdapter {
  constructor(id, name, adapter) {
    this.id = id;
    this.name = name;
    this.adapter = adapter;
    this.dispose = this.dispose.bind(this);
  }
  dispose() {
    let foundIndex = findAdapter(adapterList, 'id', this.id, 'index');
    if (foundIndex !== -1) {
      adapterList.splice(foundIndex, 1);
    }
  }
}

export default class AdapterService {

  constructor(console) {
    this.console = console;
    this.getInstance = this.getInstance(this);
    return this;
  }

  register(name, adapter) {
    name = name || null;
    if (name && findAdapter(adapterList, 'name', name)) {
      this.console.warn('Angular ui-scroll exception. Trying to register an adapter with non-unique name!');
      name = null;
    }

    let publicAdapter = new PublicAdapter(++count, name, adapter);
    adapterList.push(publicAdapter);
    return publicAdapter;
  }

  getInstance(name) {
    let found = findAdapter(adapterList, 'name', name);
    return found ? found.adapter : null;
  }

  reset() {
    adapterList = [];
  }
}