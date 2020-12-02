import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import GenericTemplate from "../templates/GenericTemplate";
import axios from "axios";
import {
  Container,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  Tabs,
  Tab,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

type Props = {} & RouteComponentProps<{}>;

const useStyles = makeStyles({
  root: {},
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  pageTitle: {
    marginBottom: 10,
  },
  formControl: {
    margin: "dense",
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: 4,
  },
});

const title = "企業マスタ";

const targetURL = `${process.env.REACT_APP_API_URL}/api/progresses/`;

const ProgressIndex: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const [entries, setEntries] = useState({
    data: [
      {
        id: 0,
        reservation_sys_id: 0,
        date: "",
        karte_number: 0,
        patient_name: "",
        examination_type: 0,
        course_name: "",
        examination_classification: "",
        company_name: 0,
        reservation_sys_company_name: "",
        needs_billing: "",
        result_destination: "",
        remarks: "",
        insurance_type: "",
        has_scanned: false,
        has_requested_docktor: false,
        has_requested_check: false,
        has_prepared: false,
        has_checked_final: false,
        has_sent_individual: false,
        has_sent_company: false,
        has_sent_invoice: false,
        docktor_name: 1,
        next_inspection_name: 1,
        memo: "",
      },
    ],
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [agename, setAge] = React.useState();
  const handleChangeNeedsBillingSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setAge(event.target.value as string);
    const data = [...entries.data];
    // @ts-ignore
    data[data.indexOf(data.needs_billing)] = "aa";
  };


  const NeedsBillingSelect = (target) => (
    <FormControl className={classes.formControl}>
      <Select
        value={target}
        onChange={handleChangeNeedsBillingSelect}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>未確定</em>
        </MenuItem>
        <MenuItem value={10}>有</MenuItem>
        <MenuItem value={20}>無</MenuItem>
        {/* <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
      {/* <FormHelperText>Without label</FormHelperText> */}
    </FormControl>
  )
  //   <FormControl className={classes.field}>
  //   <InputLabel>Category</InputLabel>
  //   <Select
  //     name="category"
  //     value={editedTask.category}
  //     onChange={handleSelectCatChange}
  //   >
  //     {catOptions}
  //   </Select>
  // </FormControl>

  const insertCheckbox = (target) => {
    if (target === true) {
      return (
        <FormControlLabel
          className={classes.root}
          value="creater"
          control={<Checkbox defaultChecked color="primary" size="small" />}
          label="true"
          labelPlacement="bottom"
        />
      );
    } else if (target === false) {
      return (
        <FormControlLabel
          className={classes.root}
          value="creater"
          control={<Checkbox color="primary" size="small" />}
          label="false"
          labelPlacement="bottom"
        />
      );
    }
  };
  // まずは予約システムの企業名を表示しておいて、あとからDBの企業名に変更できるように。
  // DBの企業名いれたら、請求書有無と結果送付先が自動で入るように


  const [state] = useState({
    columns: [
      // { title: "ID", field: "id", editable: 'never' },
      // { title: "予約システムID", field: " reservation_sys_id", editable: 'onAdd' },
      { title: "受診日", field: "date", editable: 'never' },
      // { title: "カルテ番号", field: "karte_number", editable: 'onUpdate' },
      { title: "患者名", field: "patient_name", editable: 'onAdd' },
      { title: "受診種別", field: "examination_type", editable: 'never' },
      { title: "コース", field: "course_name", editable: 'never' },
      // { title: "受診区分", field: "examination_classification" },
      // { title: "企業名", field: "company_name" },
      { title: "企業名", field: "reservation_sys_company_name", editable: 'never' },
      { title: "請求書有無", field: "needs_billing", editable: 'onUpdate', lookup: { 1: '未確定', 2: '有', 3: '無' } },
      { title: "結果送付先", field: "result_destination", editable: 'onUpdate', lookup: { 1: '未確定', 2: '個人', 3: '会社', 4: '個人/会社' } },
      { title: "備考", field: "remarks", editable: 'onUpdate' },
      { title: "保険種別", field: "insurance_type",  editable: 'onUpdate', lookup: { 1: '未確定', 2: '特定国保', 3: '特定社保', 4: '協け', 5: '付加対象外' }  },
      { title: "スキャン", field: "has_scanned", editable: 'never' },
      { title: "医師依頼", field: "has_requested_docktor", editable: 'never' },
      { title: "チェック依頼", field: "has_requested_check", editable: 'never' },
      { title: "発送準備", field: "has_prepared", editable: 'never' },
      { title: "最終チェック", field: "has_checked_final", editable: 'never' },
      { title: "結果送付(個人)", field: "has_sent_individual", editable: 'never' },
      { title: "結果送付(企業)", field: "has_sent_company", editable: 'never' },
      { title: "請求書送付", field: "has_sent_invoice", editable: 'never' },
      { title: "担当医師", field: "docktor_name", editable: 'onUpdate' },
      { title: "次の検査", field: "next_inspection_name", editable: 'onUpdate' },
      // { title: "メモ", field: "memo", editable: 'onUpdate' },
    ],
  });

  useEffect(() => {
    axios
      .get(targetURL)
      .then((response) => {
        let data = Array();
        response.data.forEach((el) => {
          data.push({
            id: el.id,
            reservation_sys_id: el.reservation_sys_id,
            date: el.date,
            karte_number: el.karte_number,
            patient_name: el.patient_name,
            examination_type: el.examination_type,
            course_name: el.course_name,
            examination_classification: el.examination_classification,
            company_name: el.company_name,
            reservation_sys_company_name: el.reservation_sys_company_name,
            needs_billing: el.needs_billing,
            result_destination: el.result_destination,
            remarks: el.remarks,
            insurance_type: el.insurance_type,
            has_scanned: insertCheckbox(el.has_scanned),
            has_requested_docktor: insertCheckbox(el.has_requested_docktor),
            has_requested_check: insertCheckbox(el.has_requested_check),
            has_prepared: insertCheckbox(el.has_prepared),
            has_checked_final: insertCheckbox(el.has_checked_final),
            has_sent_individual: insertCheckbox(el.has_sent_individual),
            has_sent_company: insertCheckbox(el.has_sent_company),
            has_sent_invoice: insertCheckbox(el.has_sent_invoice),
            docktor_name: el.docktor_name,
            next_inspection_name: el.next_inspection_name,
            memo: el.memo,
          });
        });
        setEntries({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <GenericTemplate title={""}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="人間ドック" />
          <Tab label="健康診断" />
          <Tab label="4000" />
        </Tabs>
      </Paper>
      <Container maxWidth={false} className={classes.container}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.pageTitle}
        ></Typography>
        <MaterialTable
          title={title}
          // @ts-ignore
          columns={state.columns}
          data={entries.data}
          options={{
            exportButton: true,
            search: true,
            selection: true,
            showSelectAllCheckbox: false,
            headerStyle: { position: "sticky", whiteSpace: "nowrap", top: 0 }, //改行しないように＆ヘッダ固定
            maxBodyHeight: "1200px" //大きくしてもあまり意味無し
          }}
          actions={[
            {
              tooltip: 'Remove All Selected Users',
              icon: 'delete',
              onClick: (evt, data) => alert('選択行を削除します。よろしいですか？ ')
            },
          ]}
          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  // @ts-ignore
                  data[data.indexOf(oldValue)] = newValue;
                  axios
                    .put(`${targetURL}${rowData.id}/`, {
                      reservation_sys_id: newValue,
                      date: newValue,
                      karte_number: newValue,
                      patient_name: newValue,
                      examination_type: newValue,
                      course_name: newValue,
                      examination_classification: newValue,
                      company_name: newValue,
                      reservation_sys_company_name: newValue,
                      needs_billing: newValue,
                      result_destination: newValue,
                      remarks: newValue,
                      insurance_type: newValue,
                      has_scanned: newValue,
                      has_requested_docktor: newValue,
                      has_requested_check: newValue,
                      has_prepared: newValue,
                      has_checked_final: newValue,
                      has_sent_individual: newValue,
                      has_sent_company: newValue,
                      has_sent_invoice: newValue,
                      docktor_name: newValue,
                      next_inspection_name: newValue,
                      memo: newValue,
                    })
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
                console.log("newValue: " + newValue);
                setTimeout(resolve, 1000);
              });
            },
          }}
          editable={{
            // 追加可能なカラム
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  console.log(data);
                  const payload = {
                    reservation_sys_id: newData.reservation_sys_id,
                    date: newData.date,
                    karte_number: newData.karte_number,
                    patient_name: newData.patient_name,
                    examination_type: newData.examination_type,
                    course_name: newData.course_name,
                    examination_classification: newData.examination_classification,
                    company_name: newData.company_name,
                    reservation_sys_company_name: newData.reservation_sys_company_name,
                    needs_billing: newData.needs_billing,
                    result_destination: newData.result_destination,
                    remarks: newData.remarks,
                    insurance_type: newData.insurance_type,
                    has_scanned: newData.has_scanned,
                    has_requested_docktor: newData.has_requested_docktor,
                    has_requested_check: newData.has_requested_check,
                    has_prepared: newData.has_prepared,
                    has_checked_final: newData.has_checked_final,
                    has_sent_individual: newData.has_sent_individual,
                    has_sent_company: newData.has_sent_company,
                    has_sent_invoice: newData.has_sent_invoice,
                    docktor_name: newData.docktor_name,
                    next_inspection_name: newData.next_inspection_name,
                    memo: newData.memo,
                  };
                  axios
                    .post(targetURL, newData, {
                      params: {
                        reservation_sys_id: entries.data[0].reservation_sys_id,
                        date: entries.data[0].date,
                        karte_number: entries.data[0].karte_number,
                        patient_name: entries.data[0].patient_name,
                        examination_type: entries.data[0].examination_type,
                        course_name: entries.data[0].course_name,
                        examination_classification: entries.data[0].examination_classification,
                        company_name: entries.data[0].company_name,
                        reservation_sys_company_name: entries.data[0].reservation_sys_company_name,
                        needs_billing: entries.data[0].needs_billing,
                        result_destination: entries.data[0].result_destination,
                        remarks: entries.data[0].remarks,
                        insurance_type: entries.data[0].insurance_type,
                        has_scanned: entries.data[0].has_scanned,
                        has_requested_docktor: entries.data[0].has_requested_docktor,
                        has_requested_check: entries.data[0].has_requested_check,
                        has_prepared: entries.data[0].has_prepared,
                        has_checked_final: entries.data[0].has_checked_final,
                        has_sent_individual: entries.data[0].has_sent_individual,
                        has_sent_company: entries.data[0].has_sent_company,
                        has_sent_invoice: entries.data[0].has_sent_invoice,
                        docktor_name: entries.data[0].docktor_name,
                        next_inspection_name: entries.data[0].next_inspection_name,
                        memo: entries.data[0].memo,
                      },
                    })
                    .then((res) => {
                      console.log(res.data.data);
                    });
                }, 600);
              }),
          }}
        />
      </Container>
    </GenericTemplate>
  );
};

export default withRouter(ProgressIndex);
