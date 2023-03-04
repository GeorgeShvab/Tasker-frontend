import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import { Formik, FormikHelpers } from 'formik'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd/dist/hooks'
import * as yup from 'yup'
import { AlertStatus, Tag } from '../../types'
import { useGetListsQuery } from '../api/listApiSlice'
import PoorTags from './Tag/PoorTags'
import InfoIcon from '@mui/icons-material/Info'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { selectTask, setTask } from '../redux/slices/task'
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../api/taskApiSlice'
import { formatDate, unformatDate } from '../utils/date'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import usePage from '../hooks/usePage'
import { useGetTagsQuery } from '../api/tagApiSlice'

const formSchema = yup.object().shape({
  name: yup.string().max(200, 'Назва повинна містити не більше 200 символів'),
  desciption: yup
    .string()
    .max(2000, 'Назва опису завдання повинна містити не більше 2000 символів'),
})

interface FormValues {
  name: string
  description: string
  date: string
  list: string
}

const TaskOptions: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const nameInputEl = useRef<HTMLTextAreaElement>(null)

  const page = usePage()

  const { palette } = useTheme()

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const selectedTask = useAppSelector(selectTask)

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
  }, [selectedTask])

  const lists = useGetListsQuery()
  const userTags = useGetTagsQuery()

  const [tags, setTags] = useState<Tag[]>([])

  const [alert, setAlert] = useState<AlertStatus | null>(null)

  const onDrop = (tag: Tag) => {
    if (!tags.find((item) => item._id === tag._id)) {
      setTags((prev) => [...prev, tag])
    }
  }

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: 'Tag',
      drop: onDrop,
    }),
    [tags]
  )

  const handleDeleteTag = (tag: Tag) => {
    setTags((prev) => prev.filter((item) => item._id !== tag._id))
  }

  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleSubmit = async (
    values: FormValues,
    { setErrors, resetForm }: FormikHelpers<FormValues>
  ) => {
    if (!values.name) {
      setErrors({ name: 'Введіть назву' })
      return
    }

    if (selectedTask.data) {
      try {
        let taskDate = formatDate(values.date)

        await updateTask({
          ...values,
          _id: selectedTask.data?._id,
          tags: tags.map((item) => item._id),
          date: taskDate,
          prevList: selectedTask.data?.list?._id,
        }).unwrap()

        if (!isNotMobile) {
          dispatch(setTask({ isSideBarOpened: false }))
        }

        setAlert(null)
      } catch (e) {
        setAlert({
          status: true,
          msg: 'Не вдалось оновити завдання',
          type: 'error',
        })
      }
    } else {
      try {
        let taskDate = formatDate(values.date)

        await createTask({
          ...values,
          date: taskDate,
          tags: tags.map((item) => item._id),
          list: values.list || null,
        }).unwrap()

        if (!isNotMobile) {
          dispatch(setTask({ isSideBarOpened: false }))
        }

        setAlert(null)

        resetForm()
      } catch (e) {
        setAlert({
          status: true,
          msg: 'Не вдалось створити завдання',
          type: 'error',
        })
      }
    }
  }

  const handleDeleteTask = async () => {
    if (selectedTask.data) {
      try {
        await deleteTask({
          ...selectedTask.data,
          list: selectedTask.data?.list,
        }).unwrap()

        setAlert(null)

        dispatch(
          setTask({ task: null, isSideBarOpened: isNotMobile ? true : false })
        )
      } catch (e) {
        setAlert({
          status: true,
          msg: 'Не вдалось видалити завдання',
          type: 'error',
        })
      }
    }
  }

  useEffect(() => {
    if (
      !['list', 'upcoming', 'tag', 'today', 'search', 'all'].some(
        (item) => item === page.page
      )
    ) {
      dispatch(setTask({ isSideBarOpened: false }))
    }
  }, [page])

  useEffect(() => {
    if (selectedTask) {
      setTags(selectedTask.data?.tags || selectedTask.defaultValues.tags || [])
    }
  }, [selectedTask])

  const initialDate =
    (selectedTask.data && unformatDate(selectedTask.data?.date)) ||
    page.page === 'today'
      ? unformatDate(new Date().toISOString())
      : ''

  const initialValues = {
    name: selectedTask.data?.name || selectedTask.defaultValues.name || '',
    description:
      selectedTask.data?.description ||
      selectedTask.defaultValues.description ||
      '',
    list: selectedTask.data?.list?._id || selectedTask.defaultValues.list || '',
    date: selectedTask.defaultValues.date || initialDate,
  }

  const displayedDateExample = unformatDate(
    new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  )

  const handleCloseSideBar = () => {
    dispatch(setTask({ isSideBarOpened: false }))
  }

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
                    <Box alignItems="center" gap="20px">
                      <Box
                        mb="10px"
                        display="flex"
                        alignItems="center"
                        gap="10px"
                        justifyContent={
                          isNotMobile ? 'flex-start' : 'space-between'
                        }
                      >
                        <Typography>Теги</Typography>
                        {!isNotMobile && (
                          <Typography color={palette.grey[400]} fontSize="12px">
                            {userTags.data?.length === 0
                              ? 'Створіть тег у відповідній вкладці меню'
                              : 'Виберіть теги з ваших тегів внизу'}
                          </Typography>
                        )}
                        {isNotMobile && (
                          <Tooltip
                            title={
                              isNotMobile
                                ? 'Щоб додати тег до завдання перетягніть його з ваших тегів'
                                : 'Щоб додати тег до завдання виберіть його з ваших тегів'
                            }
                          >
                            <InfoIcon
                              fontSize="small"
                              sx={{ fontSize: '14px' }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                      <Box ref={drop} minHeight="200px">
                        <PoorTags tags={tags} onDelete={handleDeleteTag} />
                      </Box>
                      {!isNotMobile && (
                        <Box>
                          <PoorTags
                            tags={userTags.data || []}
                            onClick={onDrop}
                          />
                        </Box>
                      )}
                    </Box>
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

export default TaskOptions
