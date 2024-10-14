import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box, Drawer, List, ListItem, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoursePanel = () => {
    const [selectedOption, setSelectedOption] = useState('crear_curso'); // Controla qué vista se muestra
    const [courses, setCourses] = useState([]); // Inicializa como array vacío
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [topicName, setTopicName] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [questionText, setQuestionText] = useState('');
    const [questionPrice, setQuestionPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/courses');
            setCourses(response.data || []);
        } catch (error) {
            console.error('Error al obtener los cursos:', error);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Cambia la vista según la opción seleccionada
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleAddCourse = async () => {
        if (courseName) {
            try {
                const response = await axios.post('http://localhost:5000/api/courses', { name: courseName, description });
                setCourses((prevCourses) => [
                    ...prevCourses,
                    { ...response.data, topics: [] } // Asegúrate de que el nuevo curso tenga un array vacío para "topics"
                ]);
                setCourseName('');
                setDescription('');
                fetchCourses();
            } catch (error) {
                console.error('Error al crear el curso:', error);
            }
        }
    };

    const handleAddTopic = async () => {
        if (selectedCourse && topicName) {
            try {
                const response = await axios.post(`http://localhost:5000/api/courses/${selectedCourse.id}/topics`, {
                    name: topicName
                });
                setSelectedCourse({ ...selectedCourse, topics: [...selectedCourse.topics, response.data] });
                setTopicName('');
                fetchCourses();
            } catch (error) {
                console.error('Error al crear el tema:', error);
            }
        }
    };

    const handleAddQuestion = async () => {
        if (selectedTopic && questionText && questionPrice) {
            try {
                await axios.post(`http://localhost:5000/api/topics/${selectedTopic.id}/questions`, {
                    text: questionText,
                    price: questionPrice
                });
                setQuestionText('');
                setQuestionPrice('');
                fetchCourses();
            } catch (error) {
                console.error('Error al crear la pregunta:', error.response ? error.response.data : error.message);
            }
        }
    };

    const handleDeleteCourse = async (courseToDelete) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${courseToDelete.id}`);
            setCourses(courses.filter((course) => course.id !== courseToDelete.id));
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    };

    const handleDeleteTopic = async (topicToDelete) => {
        try {
            await axios.delete(`http://localhost:5000/api/topics/${topicToDelete.id}`);
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course.id === selectedCourse.id
                        ? { ...course, topics: course.topics.filter((topic) => topic.id !== topicToDelete.id) }
                        : course
                )
            );
        } catch (error) {
            console.error('Error al eliminar el tema:', error);
        }
    };

    const handleDeleteQuestion = async (questionToDelete) => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/${questionToDelete.id}`);
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course.id === selectedCourse.id
                        ? {
                            ...course,
                            topics: course.topics.map((topic) =>
                                topic.id === selectedTopic.id
                                    ? { ...topic, questions: topic.questions.filter((question) => question.id !== questionToDelete.id) }
                                    : topic
                            )
                        }
                        : course
                )
            );
        } catch (error) {
            console.error('Error al eliminar la pregunta:', error);
        }
    };

    return (
        <div className="flex w-full min-h-screen">
            {/* Navbar */}
            <AppBar position="fixed" sx={{ backgroundColor: '#1E494F', zIndex: 1201 }}>
                <Toolbar>
                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FCFBFC', cursor: 'pointer' }}>
                            Admin Panel
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Contenedor principal */}
            <Box sx={{ display: 'flex', width: '100%', mt: '64px' }}> {/* mt para evitar que el sidebar cubra el navbar */}
                {/* Sidebar */}
                <Drawer
                    sx={{ width: 240, flexShrink: 0, top: '64px', zIndex: 1 }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        <ListItem button onClick={() => handleOptionClick('crear_curso')}>
                            Crear curso
                        </ListItem>
                        <ListItem button onClick={() => handleOptionClick('crear_tema')}>
                            Crear tema
                        </ListItem>
                        <ListItem button onClick={() => handleOptionClick('crear_pregunta')}>
                            Crear pregunta
                        </ListItem>
                        <ListItem button onClick={() => handleOptionClick('resumen_cursos')}>
                            Resumen de cursos
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Container>
                        {/* Renderizar contenido según la opción seleccionada */}
                        {selectedOption === 'crear_curso' && (
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Nombre de curso
                                </Typography>

                                {/* Input para el nombre del curso */}
                                <TextField
                                    placeholder="Nombre del curso"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />

                                {/* Input para la descripción del curso */}
                                <TextField
                                    placeholder="Descripción del curso"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />

                                {/* Botones para crear curso y cargar imagen */}
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" onClick={handleAddCourse}>
                                        Crear curso
                                    </Button>

                                    <Button variant="outlined" component="label">
                                        Cargar imagen
                                        <input hidden accept="image/*" type="file" />
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {selectedOption === 'crear_tema' && (
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Crear tema
                                </Typography>

                                {/* Select para mostrar los cursos existentes */}
                                <TextField
                                    select
                                    label="Seleccionar curso"
                                    value={selectedCourse ? selectedCourse.id : ""} // Asegúrate de que sea el id del curso seleccionado
                                    onChange={(e) => {
                                        const selected = courses.find((course) => course.id === parseInt(e.target.value)); // Encuentra el curso seleccionado
                                        setSelectedCourse(selected); // Establece el curso seleccionado
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    <option value="">Seleccionar curso</option>
                                    {courses.length > 0 ? (
                                        courses.map((course, index) => (
                                            <option key={index} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No hay cursos creados</option>
                                    )}
                                </TextField>


                                {/* Input para el nombre del tema */}
                                <TextField
                                    placeholder="Nombre del tema"
                                    value={topicName}
                                    onChange={(e) => setTopicName(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />

                                {/* Botón para crear el tema */}
                                <Button variant="contained" onClick={handleAddTopic}>
                                    Crear tema
                                </Button>
                            </Box>
                        )}

                        {selectedOption === 'crear_pregunta' && (
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Crear una nueva pregunta
                                </Typography>

                                {/* Select para mostrar los cursos existentes */}
                                <TextField
                                    select
                                    label="Seleccionar curso"
                                    value={selectedCourse ? selectedCourse.id : ""} // Asegúrate de que sea el id del curso seleccionado
                                    onChange={(e) => {
                                        const selected = courses.find((course) => course.id === parseInt(e.target.value)); // Encuentra el curso seleccionado
                                        setSelectedCourse(selected); // Establece el curso seleccionado
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    <option value="">Seleccionar curso</option>
                                    {courses.length > 0 ? (
                                        courses.map((course, index) => (
                                            <option key={index} value={course.id}>
                                                {course.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No hay cursos creados</option>
                                    )}
                                </TextField>

                                {/* Select para mostrar los temas del curso seleccionado */}
                                <TextField
                                    select
                                    label="Seleccionar tema"
                                    value={selectedTopic?.id || ""}  // Accede al id del tema seleccionado
                                    onChange={(e) => {
                                        const selected = selectedCourse.topics.find(topic => topic.id === parseInt(e.target.value, 10));
                                        setSelectedTopic(selected);
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    disabled={!selectedCourse}  // Deshabilita si no hay curso seleccionado
                                >
                                    {/* Verificamos si hay temas en el curso seleccionado */}
                                    {selectedCourse && selectedCourse.topics && selectedCourse.topics.length > 0 ? (
                                        <>
                                            <option value="" disabled>
                                                Seleccionar tema
                                            </option>
                                            {selectedCourse.topics.map((topic, index) => (
                                                <option key={index} value={topic.id}>
                                                    {topic.name}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="">{selectedCourse ? 'No hay temas creados' : 'Seleccione un curso primero'}</option>
                                    )}
                                </TextField>

                                {/* Input para el texto de la pregunta */}
                                <TextField
                                    label="Texto de la pregunta"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    disabled={!selectedTopic}  // Deshabilita si no hay tema seleccionado
                                />

                                {/* Input para el precio de la pregunta */}
                                <TextField
                                    label="Precio de la pregunta"
                                    value={questionPrice}
                                    onChange={(e) => setQuestionPrice(e.target.value)}
                                    type="number"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    disabled={!selectedTopic}  // Deshabilita si no hay tema seleccionado
                                />

                                {/* Botón para crear la pregunta */}
                                <Button variant="contained" onClick={handleAddQuestion} disabled={!selectedTopic}>
                                    Crear pregunta
                                </Button>
                                <Button variant="outlined" component="label">
                                    Cargar imagen
                                    <input hidden accept="image/*" type="file" />
                                </Button>
                            </Box>
                        )}


                        {selectedOption === 'resumen_cursos' && (
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Resumen de Cursos
                                </Typography>

                                {/* Lista de cursos */}
                                {courses.length > 0 ? (
                                    courses.map((course, courseIndex) => (
                                        <Box key={courseIndex} sx={{ mb: 4 }}>
                                            {/* Título del curso */}
                                            <Typography
                                                variant="h5"
                                                sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() =>
                                                    setCourses((prevCourses) =>
                                                        prevCourses.map((c, index) =>
                                                            index === courseIndex
                                                                ? { ...c, showTopics: !c.showTopics }
                                                                : c
                                                        )
                                                    )
                                                }
                                            >
                                                {course.name}
                                            </Typography>

                                            {/* Temas del curso */}
                                            {course.showTopics && course.topics.length > 0 && (
                                                <List sx={{ ml: 4 }}>
                                                    {course.topics.map((topic, topicIndex) => (
                                                        <Box key={topicIndex}>
                                                            {/* Título del tema */}
                                                            <Typography
                                                                variant="h6"
                                                                sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                                onClick={() =>
                                                                    setCourses((prevCourses) =>
                                                                        prevCourses.map((c, index) =>
                                                                            index === courseIndex
                                                                                ? {
                                                                                    ...c,
                                                                                    topics: c.topics.map((t, i) =>
                                                                                        i === topicIndex
                                                                                            ? {
                                                                                                ...t,
                                                                                                showQuestions: !t.showQuestions,
                                                                                            }
                                                                                            : t
                                                                                    ),
                                                                                }
                                                                                : c
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                Tema: {topic.name}
                                                            </Typography>

                                                            {/* Preguntas del tema */}
                                                            {topic.showQuestions && topic.questions.length > 0 && (
                                                                <List sx={{ ml: 4 }}>
                                                                    {topic.questions.map((question, questionIndex) => (
                                                                        <ListItem key={questionIndex}>
                                                                            {question.text} - S/{question.price}
                                                                        </ListItem>
                                                                    ))}
                                                                </List>
                                                            )}
                                                        </Box>
                                                    ))}
                                                </List>
                                            )}
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body1">No hay cursos creados aún.</Typography>
                                )}
                            </Box>
                        )}


                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default CoursePanel;
