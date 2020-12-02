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
  FormControlLabel,
} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
});

const title = "進捗管理";
const targetURL = `${process.env.REACT_APP_API_URL}/api/progresses/`;
// const [checked, setChecked] = React.useState(true);

// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setChecked(event.target.checked);
// };

const ProgressIndex: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        reservation_sys_id: "",
        date: "",
        karte_number: "",
        patient_name: "",
        examination_type: "",
        course_name: "",
        examination_classification: "",
        company_name: "",
        reservation_sys_company_name: "",
        needs_billing: "",
        result_destination: "",
        remarks: "",
        insurance_type: "",
        has_scanned: "",
        has_requested_docktor: "",
        has_requested_check: "",
        has_prepared: "",
        has_checked_final: "",
        has_sent_individual: "",
        has_sent_company: "",
        has_sent_invoice: "",
        docktor_name: "",
        next_inspection_name: "",
        memo: "",
      },
    ],
  });

  const [state] = React.useState({
    columns: [
      // { title: "ID", field: "id" },
      // { title: "予約システムID", field: "reservation_sys_id" },
      { title: "受診日", field: "date", },
      // { title: "カルテ番号", field: "karte_number" },
      { title: "患者名", field: "patient_name" },
      { title: "受診種別", field: "examination_type" },
      { title: "コース", field: "course_name" },
      // { title: "受診区分", field: "examination_classification" },
      //とりあえず予約システムの企業名を表示
      // { title: "企業名", field: "company_name" },
      { title: "企業名", field: "reservation_sys_company_name" },
      { title: "請求書有無", field: "needs_billing" },
      { title: "結果送付先", field: "result_destination" },
      { title: "備考", field: "remarks" },
      { title: "保険種別", field: "insurance_type" },
      { title: "スキャン", field: "has_scanned" },
      { title: "医師依頼", field: "has_requested_docktor" },
      { title: "チェック依頼", field: "has_requested_check" },
      { title: "発送準備", field: "has_prepared" },
      { title: "最終チェック", field: "has_checked_final" },
      { title: "結果送付(個人)", field: "has_sent_individual" },
      { title: "結果送付(企業)", field: "has_sent_company" },
      { title: "請求書送付", field: "has_sent_invoice" },
      { title: "担当医師", field: "docktor_name" },
      { title: "次の検査", field: "next_inspection_name" },
      { title: "メモ", field: "memo" },
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
          columns={state.columns}
          data={entries.data}
          options={{
            // showTitle: false,
            // selection: true,
            // exportButton: true,
            // tableLayout: "fixed",
            headerStyle: { position: "sticky", whiteSpace: "nowrap", top: 0 }, //改行しないように＆ヘッダ固定
            maxBodyHeight: "1200px" //大きくしてもあまり意味無し
            // fixedColumns: {
            //   left: 4,
            // },
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  console.log(data);
                  const payload = {
                    id: newData.id,
                  };
                  axios
                    .post(targetURL, newData, {
                      params: {
                        id: entries.data[0].id,
                      },
                    })
                    .then((res) => {
                      console.log(res.data.data);
                    });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  // @ts-ignore
                  data[data.indexOf(oldData)] = newData;
                  axios
                    .put(`${targetURL}+${newData.id}/`, newData, {
                      params: {
                        id: entries.data[0].id,
                      },
                    })
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  data.splice(data.indexOf(oldData), 1);
                  axios
                    .delete(`${targetURL}+${oldData.id}/`, {
                      params: {
                        id: entries.data[0].id,
                      },
                    })
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
          }}
        />
      </Container>
    </GenericTemplate>
  );
};

export default withRouter(ProgressIndex);
