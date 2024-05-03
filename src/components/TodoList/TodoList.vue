<template>
    <v-container>
        <TaskModal v-if="isTaskModalOpen" :isOpen="isTaskModalOpen" @close="toggleTaskModal" @taskSave="onTaskSave" />

        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-btn color="info" @click="toggleTaskModal">Add new task</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>

            <v-col v-for="taskData in tasks" cols="12" 
            xs="12" sm="6" md="4" lg="3" xl="3" xxl="3"
             :key="taskData._id">
                <Task  :data="taskData" />
            </v-col>

        </v-row>
    </v-container>
</template>


<script src="./todoList.js"></script>