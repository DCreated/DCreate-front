import { $get } from './axios';
// get Production

export async function handleCollectionVolumn(data) {
  let { prinId, success } = data;
  if (!prinId) {
    success && success({ sum: 0 });
    return;
  }
  const url = '/wicp-op-records/aggregation';
  const params = {
    caller_principal: prinId,
    _column: 'amount',
    _func: 'sum',
  };
  $get(url, params).then((res) => {
    success && success(res);
  });
}

export async function handleAllCollectionVolumn(data) {
  let { prinIds, success } = data;
  if (!prinIds) {
    success && success({ sum: 0 });
    return;
  }

  let url = prinIds.reduce(
    (pre, cur, index) => {
      pre += `caller_principal=${cur}`;
      if (index < prinIds.length - 1) {
        pre += '&';
      }
      return pre;
    },
    ['/wicp-op-records/group-by?'],
  );
  const params = {
    _column: 'amount',
    _func: 'sum',
    _value: 'caller_principal',
    page_size: prinIds.length,
  };
  $get(url, params).then((res) => {
    success && success(res);
  });
}
