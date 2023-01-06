import { getCurrentInstance, reactive } from "vue"


export default () => {

  const current = getCurrentInstance();

  function createSubChain() {
    (current.refs.dialogSubChain as any).visible = true;
  }

  function editSubChain(row) {
    (current.refs.dialogSubChain as any).visible = true;
  }

  return {
    createSubChain,
    editSubChain,
  }
}