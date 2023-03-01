// npm
import { defineComponent, h } from "vue";
import { useRoute } from "vue-router";

// components
import { ElButton, ElInput } from "element-plus";
import ElPagination from '@/common/components/twice/pagination';
import LayoutContainer from '@/common/components/layout-container/index.vue';
import ShrinkInputSearch from "@/common/components/shrink-input-search";
import ShrinkTable from "@/common/components/shrink-table";
import styles from './index.module.scss';

// utils
import { dateFormater } from "@/common/utils/date";
import Init from './init';



const SHRINKKEY = 'page-access';

export default defineComponent(() => {

  const $route = useRoute();

  const {
    paging, onCurrentChange, onSizeChange, pagingIndex,
    form, search, reset,
    tableData, initData,
    menuList, changeMenu,
  } = new Init();


  function onKeydown(e) {
    e.keyCode === 13 && search();  // 回车搜索
  }

  const JSX_Search = () => <ShrinkInputSearch
    storageKey={SHRINKKEY} 
    inputList={[
      { label: 'IP地址', slots: <ElInput placeholder='请输入IP地址' modelValue={form.ip} onInput={value => form.ip = value} onKeydown={onKeydown} onClear={search} /> },
      { label: '请求路径', slots: <ElInput placeholder='请输入请求路径' modelValue={form.url} onInput={value => form.url = value} onKeydown={onKeydown} onClear={search} /> },
      // { label: '访问时间', slots: <ElTimePicker modelValue={form.time} is-range range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" onInput={value => form.time = value} /> },
    ]}
    buttonList={[
      <ElButton type='primary' onClick={search}>{{ default: () => '搜索' }}</ElButton>,
      <ElButton onClick={reset}>{{ default: () => '重置' }}</ElButton>,
    ]}
  />

  const JSX_Pagination = () => <ElPagination
    defaultCurrentPage={paging.pageNumber}
    defaultPageSize={paging.pageSize}
    total={paging.total}
    onCurrentChange={onCurrentChange}
    onSizeChange={onSizeChange}
  />

  const tableColumnProps = [
    { label: '序号', width: 60, slots: (scope) => pagingIndex(paging.pageNumber, paging.pageSize, scope.$index) },
    { prop: 'ip', label: 'IP', width: 150 },
    { prop: 'accessTime', label: '访问时间', width: 160, slots: (scope) => dateFormater(scope.row.accessTime * 1000) },
    { prop: 'userAgent', label: 'userAgent' },
    { prop: 'url', label: 'PATH' },
  ]

  const JSX_Table = () => <ShrinkTable storageKey={SHRINKKEY} tableProps={{ data: tableData.value }} tableColumnProps={tableColumnProps} /> 


  const JSX_MenuList = () => h(<ul class={styles.menu}>
    {menuList.value.map((val, index) => <li
      key={index}
      class={val.name === $route.query.log ? styles.active : ''}
      onClick={() => changeMenu(val)}
    >{ val.name }</li>)}
  </ul>)


  return () => h(<LayoutContainer>{{
    default: () => [
      <JSX_MenuList />,
      <div class={styles.content}>
        <JSX_Search />
        <JSX_Table />
        <JSX_Pagination />
      </div>
    ]
  }}
  </LayoutContainer>)

})