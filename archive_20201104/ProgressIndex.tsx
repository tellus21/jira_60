import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GenericTemplate from "../templates/GenericTemplate";
import { colors, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { CenterFocusStrong } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

type Props = {} & RouteComponentProps<{}>;
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: 0,
    marginRight: 0, // used for row presentation of radio/checkbox
    whiteSpace: 'nowrap',
    '&$disabled': {
      cursor: 'default',

    },
  },
});

const ProgressIndex: React.FC<Props> = (props) => {
  const classes = useStyles();

  const theme = createMuiTheme({
    typography: {
      fontSize:13,
    },
  });
  const [checked, setChecked] = React.useState(true);
  const aaa: string = "11/1" + "\n" + "吉田";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <GenericTemplate title={"進捗管理"}>
      <ThemeProvider theme={theme}>
        <MaterialTable
          columns={[
            { title: "ID", field: "id" },
            {
              title: "受診日",
              field: "date",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11
                ,
              },
            },
            {
              title: "カルテ番号",
              field: "karte",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11
              },
            },
            {
              title: "患者名",
              field: "patient_name",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11
              },
            },
            {
              title: "受信種別",
              field: "consultation_type",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11,
                justifyContent: "Center",
                whiteSpace: 'nowrap',
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11
              },
            },
            {
              title: "コース",
              field: "course",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 11
              },
            },
            {
              title: "スキャン",
              field: "scan",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "作成者",
              field: "creater",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "医師依頼",
              field: "docktor_request",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "チェク依頼",
              field: "check_request",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "発送準備",
              field: "preparation_for_sending",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "最終チェク",
              field: "final_check",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "結果送付(個人)",
              field: "send_individual",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "結果送付(企業)",
              field: "send_company",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            {
              title: "請求書発送",
              field: "send_invoice",
              cellStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 10,
                justifyContent: "Center",
              },
              headerStyle: {
                width: 300,
                maxWidth: 300,
                fontSize: 5,
                backgroundColor:"orange"
              },
            },
            { title: "備考", field: "remarks" },
            { title: "保険種別", field: "insurance_type" },
            { title: "待ち", field: "next_action" },
            { title: "先生名", field: "docktor" },
            { title: "メモ", field: "memo" },
            { title: "作成日", field: "created_at" },
            { title: "更新日", field: "updated_at" },
          ]}
          data={[
            {
              id: 1,
              date: "2020/10/20",
              karte: "12345",
              patient_name: "ﾀﾅｶﾏｻﾋﾛ",
              consultation_type: "人間ドック",
              course: "コースA",
              scan: (
                <FormControlLabel
                  className={classes.root}
                  value="scan"
                  control={<Checkbox color="primary" />}
                  label={aaa}
                  labelPlacement="bottom"
                />
              ),
              creater: (
                <FormControlLabel
                  className={classes.root}
                  value="creater"
                  control={<Checkbox color="primary" />}
                  label="11/1吉田"
                  labelPlacement="bottom"
                />
              ),
              docktor_request: (
                <FormControlLabel
                  className={classes.root}
                  value="creater"
                  control={<Checkbox color="primary" />}
                  label="11/1吉田"
                  labelPlacement="bottom"
                />
              ),
              check_request: (
                <FormControlLabel
                  className={classes.root}
                  value="creater"
                  control={<Checkbox color="primary" />}
                  label="11/1吉田"
                  labelPlacement="bottom"
                />
              ),
              preparation_for_sending: (
                <FormControlLabel
                  className={classes.root}
                  value="creater"
                  control={<Checkbox color="primary" />}
                  label="11/1吉田"
                  labelPlacement="bottom"
                />
              ),
              final_check: "",
              send_individual: "",
              send_company: "",
              send_invoice: "",
              remarks: "",
              insurance_type: "",
              next_action: "",
              docktor: "",
              memo: "",
              reated_at: "2020/10/20",
              updated_at: "2020/11/05",
            },
            {
              id: 2,
              name: "鈴木先生",
              created_at: "2020/10/21",
              updated_at: "2020/11/06",
            },
            {
              id: 3,
              name: "田中先生",
              created_at: "2020/10/22",
              updated_at: "2020/11/07",
            },
            {
              id: 4,
              name: "山田先生",
              created_at: "2020/10/23",
              updated_at: "2020/11/08",
            },
          ]}
          options={{
            showTitle: false,
            selection: true,
            exportButton: true,
            tableLayout: "fixed",
            headerStyle: { whiteSpace: "nowrap" }, //改行しないように
            fixedColumns: {
              left: 4,
            },
          }}
        />
      </ThemeProvider>
    </GenericTemplate>
  );
};

export default withRouter(ProgressIndex);
