import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { DOCKTOR, READ_DOCKTOR, POST_DOCKTOR, DOCKTOR_STATE } from "../types";

export const fetchAsyncGetDocktors = createAsyncThunk("docktor/getDocktor", async () => {
  const res = await axios.get<READ_DOCKTOR[]>(
    `${process.env.REACT_APP_API_URL}/api/docktors/`,
    {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    }
  );
  return res.data;
});

export const fetchAsyncCreateDocktor = createAsyncThunk(
  "docktor/createDocktor",
  async (docktor: POST_DOCKTOR) => {
    const res = await axios.post<READ_DOCKTOR>(
      `${process.env.REACT_APP_API_URL}/api/docktors/`,
      docktor,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncUpdateDocktor = createAsyncThunk(
  "docktor/updateDocktor",
  async (docktor: POST_DOCKTOR) => {
    const res = await axios.put<READ_DOCKTOR>(
      `${process.env.REACT_APP_API_URL}/api/docktors/${docktor.id}/`,
      docktor,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncDeleteDocktor = createAsyncThunk(
  "docktor/deleteDocktor",
  async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/docktors/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return id;
  }
);

export const initialState: DOCKTOR_STATE = {
  docktors: [
    {
      id: 0,
      name: "",
      created_at: "",
      updated_at: "",
    },
  ],
  editedDocktor: {
    id: 0,
    name:"",
    created_at: "",
    updated_at: "",
  },
  selectedDocktor: {
    id: 0,
    name:"",
    created_at: "",
    updated_at: "",
  },
};

export const docktorSlice = createSlice({
  name: "docktor",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetDocktors.fulfilled,
      (state, action: PayloadAction<READ_DOCKTOR[]>) => {
        return {
          ...state,
          docktors: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetDocktors.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncCreateDocktor.fulfilled,
      (state, action: PayloadAction<READ_DOCKTOR>) => {
        return {
          ...state,
          docktors: [action.payload, ...state.docktors],
          // editedTask: initialState.editedTask,
        };
      }
    );
    builder.addCase(fetchAsyncCreateDocktor.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncUpdateDocktor.fulfilled,
      (state, action: PayloadAction<READ_DOCKTOR>) => {
        return {
          ...state,
          docktors: state.docktors.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
          // editedTask: initialState.editedTask,
          // selectedTask: initialState.selectedTask,
        };
      }
    );
    builder.addCase(fetchAsyncUpdateDocktor.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncDeleteDocktor.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          docktors: state.docktors.filter((t) => t.id !== action.payload),
          // editedTask: initialState.editedTask,
          // selectedTask: initialState.selectedTask,
        };
      }
    );
    builder.addCase(fetchAsyncDeleteDocktor.rejected, () => {
      window.location.href = "/";
    });
  },
});

// export const { editTask, selectTask } = taskSlice.actions;
export const selectSelectedDocktor = (state: RootState) => state.docktor.selectedDocktor;
// export const selectEditedTask = (state: RootState) => state.task.editedTask;
// export const selectTasks = (state: RootState) => state.task.tasks;
// export const selectUsers = (state: RootState) => state.task.users;
// export const selectCategory = (state: RootState) => state.task.category;
export default docktorSlice.reducer;
