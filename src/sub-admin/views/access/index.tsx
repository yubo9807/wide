// npm
import { defineComponent, h, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// api
import { api_getFileListOrContent } from "@/sub-admin/api/file";
import { api_getAccessRecordList } from "@/sub-admin/api/access";

// components
import { ElButton, ElInput, ElPagination } from "element-plus";
import LayoutContainer from '@/common/components/layout-container/index.vue';
import ShrinkInputSearch from "@/common/components/shrink-input-search";
import ShrinkTable from "@/common/components/shrink-table";
import styles from './index.module.scss';

// utils
import { dateFormater } from "@/common/utils/date";
import { deleteEmpty } from "@/common/utils/object";
import { pagingIndex } from "@/common/utils/number";




export default defineComponent(() => {


  // #region 分页
  const paging = reactive({
    pageNumber: 1,
    pageSize:   10,
    total:      0,
  })

  function onSizeChange(val: number) {
    paging.pageSize = val;
    getNowDayData(nowDay);
  }
  function onCurrentChange(val: number) {
    paging.pageNumber = val;
    getNowDayData(nowDay);
  }

  const JSX_Pagination = () => <ElPagination
    defaultCurrentPage={paging.pageNumber}
    defaultPageSize={paging.pageSize}
    total={paging.total}
    onCurrentChange={onCurrentChange}
    onSizeChange={onSizeChange}
  />
  // #endregion



  // #region 搜索
  const initialForm = {
    ip:   '',
    url:  '',
    time: [Date.now(), Date.now()],
  }
  const form = reactive(Object.assign({}, initialForm));

  function search() {
    paging.pageNumber = 1;
    Promise.resolve().then(() => {
      getNowDayData(nowDay);
    })
  }

  function reset() {
    for (const key in initialForm) {
      form[key] = initialForm[key];
    }
    search();
  }

  function onKeydown(e) {
    e.keyCode === 13 && search();  // 回车搜索
  }

  const JSX_Search = () => <ShrinkInputSearch storageKey="111" 
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
  // #endregion



  // #region 表格，访问记录
  const tableData = ref([]);  // 访问数据

  /**
   * 获取当天访问数据
   */
  async function getNowDayData(day: string) {
    const hour      = 1000 * 60 * 60;
    const startTime = new Date(day).getTime() - hour * 8;
    const endTime   = startTime + hour * 24;

    const searchForm = deleteEmpty(form);
    const params     = {
      startTime:  startTime / 1000,
      endTime:    endTime / 1000 - 1,
      pageNumber: paging.pageNumber,
      pageSize:   paging.pageSize,
      ...searchForm,
    }
    const [err, res] = await api_getAccessRecordList(params);
    if (err) {
      tableData.value = [];
      paging.total = 0;
      return;
    };

    const { list, total } = res.data;
    tableData.value = list;
    paging.total = total;
  }

  const tableColumnProps = [
    { label: '序号', width: 60, slots: (scope) => pagingIndex(paging.pageNumber, paging.pageSize, scope.$index) },
    { prop: 'ip', label: 'IP', width: 150 },
    { prop: 'accessTime', label: '访问时间', width: 160, slots: (scope) => dateFormater(scope.row.accessTime * 1000) },
    { prop: 'url', label: 'PATH' },
    { prop: 'userAgent', label: 'userAgent' },
  ]

  const JSX_Table = () => <ShrinkTable storageKey="111" tableProps={{ data: tableData.value }} tableColumnProps={tableColumnProps} /> 
  // #endregion



  // #region 左侧菜单
  const $route  = useRoute();
  const $router = useRouter();
  
  let   nowDay   = null;
  const menuList = ref([]);
  (async function() {
    const [err, res] = await api_getFileListOrContent({ path: '/access' });
    if (err) return;

    const data = res.data.reverse();
    menuList.value = data;
    
    const log = $route.query.log;
    if (log) {
      nowDay = (log as string).replace('.log', '');
      getNowDayData(nowDay);
    } else {
      $router.replace({ query: { log: data[0].name }});
    }
  }());

  watch(() => $route.query.log, value => {
    if (value) {
      nowDay = (value as string).replace('.log', '');
      getNowDayData(nowDay);
    }
  })

  /**
   * 切换菜单
   * @param val 
   */
  function changeMenu(val) {
    $router.replace({ query: { log: val.name } });
    const day = val.name.replace(val.ext, '');
    paging.pageNumber = 1;
    getNowDayData(day);
  }

  const JSX_MenuList = () => h(<ul class={styles.menu}>
    {menuList.value.map((val, index) => <li
      key={index}
      class={val.name === $route.query.log ? styles.active : ''}
      onClick={() => changeMenu(val)}
    >{ val.name }</li>)}
  </ul>)
  // #endregion



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