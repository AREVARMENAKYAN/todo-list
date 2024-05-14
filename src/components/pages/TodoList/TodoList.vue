<template>
    <v-container>
        <TaskModal v-if="isTaskModalOpen" :isOpen="isTaskModalOpen" :editingTask="editingTask" @close="toggleTaskModal"
            @taskSave="onTaskSave" @taskAdd="onTaskAdd" />

        <ConfirmDialog :isOpen="isDeleteDialogOpen" title="Attention!" :text="confirmDialogText"
            @close="toggleDeleteDialog" @confirm="onSelectedTasksDelete" />

        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-btn class="addNewTask" color="info" @click="toggleTaskModal">Add new task</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col v-for="taskData in tasks" cols="12" xs="12" sm="6" md="4" lg="3" xl="3" xxl="3" :key="taskData._id">
                <Task :data="taskData" :isSelected="selectedTasks.has(taskData._id)" @changeTaskStatus="onTaskChecked"
                    @taskEdit="onTaskEdit(taskData)" @taskDelete="onTaskDelete(taskData._id)"
                    @taskSelect="toggleTaskId(taskData._id)" />
            </v-col>
        </v-row>
    </v-container>

    <v-btn :disabled="isDeleteSelectedBtnDisabled" class="delete-seleced-btn" color="error" variant="elevated"
        @click="toggleDeleteDialog">
        <v-icon icon="mdi-delete-outline" />Delete selected
    </v-btn>
</template>


<script src="./todoList.js"></script>

<style scoped>
.addNewTask {
    margin-top: 20px;
}

.delete-seleced-btn {
    position: fixed;
    right: -145px;
    bottom: 40px;

}

.delete-seleced-btn:hover {
    animation-name: btn-animation;
    animation-duration: 1s;
    right: 20px;
}

@keyframes btn-animation {
    from {
        right: -145px;
    }

    to {
        right: 20px;
    }
}
</style>