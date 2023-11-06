import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/apiConfig";

const initialState = {
  cvmain: {
    title: "",
    template: "",
    personal: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    socialProfiles: [],
  },
  loading: false,
  error: null,
  isEditing: false,
  isReading: false,
  isCreating: false,
  message: "",
};

export const updateOneCV = createAsyncThunk(
  "templateSlice/updateOneCV",
  async ({ cvData, token, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.put(`/cv/updateone/${id}`, cvData, config);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getOneCV = createAsyncThunk(
  "templateSlice/getOneCV",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      console.log({
        "Token from template": token,
        "id from template": id,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.get(`/cv/getone/${id}`, config);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteOneCV = createAsyncThunk(
  "template/deleteOneCV",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log({ "getting token and id": token, id });
      const { data } = await api.delete(`/cv/removeone/${id}`, config);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const createOneCV = createAsyncThunk(
  "template/createOneCV",
  async ({ cvData, token }, { rejectWithValue }) => {
    try {
      console.log("hitting slice");
      console.log({ cvData, token });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.post(`/cv/post`, cvData, config);
      console.log({ "Post Data": data });
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setPerosnalDetails: (state, action) => {
      console.log("Sending perosnal data");
      console.log(action.payload);
      const { personal, template, title } = action.payload;

      return {
        ...state,
        cvmain: {
          ...state.cvmain,
          personal: { ...personal }, // Create a new object to avoid mutations
          template: template,
          title: title,
        },
      };
    },

    setEducation: (state, action) => {
      state.cvmain.education = action.payload;
    },
    setExperience: (state, action) => {
      // Loop through the array of experiences and convert dates
      const formattedExperiences = action.payload.map((experience) => {
        const { startDate, endDate, ...rest } = experience;
        const formattedStartDate = new Date(startDate).toISOString();
        const formattedEndDate = new Date(endDate).toISOString();
        return {
          ...rest,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };
      });

      // Update the state with the converted experiences
      state.cvmain.experience = formattedExperiences;
    },
    setSkills: (state, action) => {
      state.cvmain.skills = action.payload;
    },
    setProjects: (state, action) => {
      state.cvmain.projects = action.payload;
    },
    setSocialProfiles: (state, action) => {
      state.cvmain.socialProfiles = action.payload;
    },
    removePerosnalDetails: (state) => {
      state.cvmain.title = "";
      state.cvmain.template = "";
      state.cvmain.personal = {};
    },
    setCVEditing: (state, action) => {
      state.isEditing = true;
      state.isReading = false;
      state.loading = false;
      state.error = false;
      state.message = "Your are now editing the CV";
    },
    setCVCreating: (state, action) => {
      state.isEditing = false;
      state.isCreating = true;
      state.loading = false;
      state.error = false;
      state.message = "Your are now Creating the CV";
    },
    setCVReading: (state, action) => {
      state.isEditing = false;
      state.isReading = true;
      state.loading = false;
      state.error = false;
      state.message = "Your are now reading the CV ";
    },
    setCVClean: (state, action) => {
      state.isCreating = true;
      state.cvmain = null;
      state.error = false;
      state.loading = false;
      state.message = "Creating new CV";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOneCV.fulfilled, (state, action) => {
        state.message = "You are updating your old CV";
        state.loading = false;
        state.error = null;
        state.cvmain = action.payload;
        state.isEditing = false;
        // Handle the response data here if needed
      })
      .addCase(updateOneCV.pending, (state) => {
        state.loading = true;
        state.isEditing = true;
        state.error = null;
      })
      .addCase(updateOneCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOneCV.fulfilled, (state, action) => {
        state.cvmain = action.payload.data;
        state.loading = false;
        state.isEditing = false;
        state.isReading = true;
      })
      .addCase(getOneCV.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.isReading = false;
        // state.cvmain = action.payload.data
      })
      .addCase(getOneCV.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isReading = true;
        // state.cvmain = action.payload.data
      })
      .addCase(deleteOneCV.fulfilled, (state, action) => {
        console.log({ "Deleting data": action.payload });
        state.loading = false;
        state.isEditing = false;
        state.isReading = false;
        state.message = "Deleted your cv";
      })
      .addCase(deleteOneCV.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.isReading = false;
      })
      .addCase(deleteOneCV.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOneCV.fulfilled, (state, action) => {
        console.log({ "Created your new CV": action.payload });
        state.cvmain = action.payload;
        state.isCreating = false;
        state.loading = false;
        state.isEditing = false;
        state.isReading = false;
        state.message = "Created you new CV";
        // state.message = action.payload.data;
      })
      .addCase(createOneCV.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.isCreating = false;
        state.isReading = false;
        // state.cvmain = action.payload.data
      })
      .addCase(createOneCV.pending, (state, action) => {
        state.loading = true;
        state.isCreating = true;
        state.error = null;
        // state.cvmain = action.payload.data
      });
  },
});

export const {
  setPerosnalDetails,
  setEducation,
  setExperience,
  setSkills,
  setProjects,
  setSocialProfiles,
  removePerosnalDetails,
  setCVEditing,
  setCVReading,
  setCVClean,
  setCVCreating,
} = templateSlice.actions;

export default templateSlice.reducer;
