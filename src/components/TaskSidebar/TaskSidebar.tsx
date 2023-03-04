import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import { Formik } from 'formik'
import { FunctionComponent, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { useGetListsQuery } from '../../api/listApiSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectTask, setTask } from '../../redux/slices/task'
import { getNextDay, unformatDate } from '../../utils/date'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TaskSideBarTags from './TaskSidebarTags'
import useGetInitialValues from './useGetInitialValues'
import useTaskActions from './useTaskActions'

const formSchema = yup.object().shape({
  name: yup.string().max(200, 'Назва повинна містити не більше 200 символів'),
  desciption: yup
    .string()
    .max(2000, 'Назва опису завдання повинна містити не більше 2000 символів'),
})

const TaskSidebar: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const nameInputEl = useRef<HTMLTextAreaElement>(null)

  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const selectedTask = useAppSelector(selectTask)

  const lists = useGetListsQuery()

  const { handleSubmit, handleDeleteTask, alert, setAlert, tags, setTags } =
    useTaskActions() //I am not sure about this emplementation but decided to put most of logic in hook

  useEffect(() => {
    if (
      selectedTask.isSideBarOpened &&
      !selectedTask.data?.name &&
      !selectedTask.defaultValues?.name
    ) {
      setTimeout(() => {
        nameInputEl.current?.focus()

        nameInputEl.current?.setSelectionRange(0, 0)
      }, 500) // timeout because it looks much better
    } else {
      nameInputEl.current?.blur()
    }

    if (selectedTask) {
      setTags(selectedTask.data?.tags || selectedTask.defaultValues.tags || [])
    }
  }, [selectedTask])

  const displayedDateExample = unformatDate(
    new Date(getNextDay()).toISOString()
  )

  const handleCloseSideBar = () => {
    dispatch(setTask({ isSideBarOpened: false }))
  }

  const initialValues = useGetInitialValues()

  return (
    <>
      <Box
        padding={isNotMobile ? '20px 25px' : '20px 25px'}
        sx={{ background: palette.background.dark }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
          validateOnChange={false}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap="30px"
                minHeight="calc(var(--full-height) - 40px)"
              >
                <Box>
                  <Box
                    mb="20px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h5" fontWeight="800">
                      Завдання
                    </Typography>
                    <IconButton onClick={handleCloseSideBar}>
                      <ArrowBackIcon />
                    </IconButton>
                  </Box>
                  <Box mb="30px">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="name"
                      type="text"
                      placeholder="Назва"
                      autoComplete="off"
                      sx={{ mb: '10px' }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={(touched.name && errors.name) || ' '}
                      inputProps={{ maxLength: 200 }}
                      inputRef={nameInputEl}
                      fullWidth
                      multiline
                    />
                    <TextField
                      variant="outlined"
                      size="small"
                      minRows="5"
                      name="description"
                      type="text"
                      placeholder="Опис завдання"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      error={
                        Boolean(touched.description) &&
                        Boolean(errors.description)
                      }
                      helperText={touched.description && errors.description}
                      inputProps={{ maxLength: 2000 }}
                      multiline
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="20px"
                      mb="10px"
                    >
                      <Typography sx={{ width: '80px' }}>Список</Typography>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.list}
                          size="small"
                          name="list"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <br />
                          </MenuItem>
                          {lists.data?.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="20px"
                      mb="10px"
                    >
                      <Typography sx={{ width: '80px' }}>Дата</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        name="date"
                        type="text"
                        placeholder={displayedDateExample}
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date}
                        error={Boolean(touched.date) && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                        inputProps={{ maxLength: 10 }}
                        fullWidth
                      />
                    </Box>
                    <TaskSideBarTags tags={tags} setTags={setTags} />
                  </Box>
                </Box>
                <Box display="flex" gap="15px">
                  {selectedTask.data ? (
                    <Button
                      color="warning"
                      variant="outlined"
                      onClick={handleDeleteTask}
                      fullWidth
                    >
                      Видалити
                    </Button>
                  ) : (
                    <Button
                      color="warning"
                      variant="outlined"
                      onClick={() => resetForm()}
                      fullWidth
                    >
                      Очистити
                    </Button>
                  )}
                  <Button variant="contained" type="submit" fullWidth>
                    Зберегти
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Snackbar
        open={alert?.status}
        autoHideDuration={10000}
        onClose={() =>
          setAlert((prev) =>
            prev !== null ? { ...prev, status: false } : null
          )
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert?.type} sx={{ width: '100%' }}>
          {alert?.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default TaskSidebar
