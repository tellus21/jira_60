import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import GenericTemplate from "../templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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

const title = "企業マスタ";

const targetURL = `${process.env.REACT_APP_API_URL}/api/companies/`;

const CompanyIndex: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        name: "",
        address: "",
        telephone_number: "",
        fax_number: "",
      },
    ],
  });

  const [state] = useState({
    columns: [
      { title: "ID", field: "id", editable: 'never' },
      { title: "名前", field: "name",editable: 'onAdd'},
      { title: "住所", field: "adddress",editable: 'onAdd'},
      { title: "電話番号", field: "telephone_number",editable: 'onAdd'},
      { title: "FAX番号", field: "fax_number",editable: 'onAdd'},
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
            name: el.name,
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
      <Container maxWidth="md" className={classes.container}>
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
            showSelectAllCheckbox: false
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
                      name: newValue,
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
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  console.log(data);
                  const payload = {
                    name: newData.name,
                  };
                  axios
                    .post(targetURL, newData, {
                      params: {
                        name: entries.data[0].name,
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

export default withRouter(CompanyIndex);
