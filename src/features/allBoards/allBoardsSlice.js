import data from "../../data.json";
import {
  actionEnums,
  getTaskIndexes,
  getBoardIndex,
  getCommentsRecursion,
} from "../../helperFunc";

console.log(data);

// const initialState = localStorage.getItem("reduxState")
//   ? JSON.parse(localStorage.getItem("reduxState")).allBoards
//   : data.boards;

const initialState = [
  {
      "name": "Platform Launch",
      "columns": [
          {
              "name": "Queue",
              "tasks": [
                  {
                      "title": "Build UI for onboarding flow",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000001",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Sign up page",
                              "isCompleted": false
                          },
                          {
                              "title": "Sign in page",
                              "isCompleted": false
                          },
                          {
                              "title": "Welcome page",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": [
                          {
                              "id": "1670041346547516775",
                              "content": "Comment 1",
                              "comments": [
                                  {
                                      "id": "16700408942626022",
                                      "content": "Yeah, I know!",
                                      "comments": [
                                          {
                                              "id": "1670451624316623",
                                              "content": "You should've know better!",
                                              "comments": [
                                                  {
                                                      "id": "167600366134212324",
                                                      "content": "ONE",
                                                      "comments": [
                                                          {
                                                              "id": "108342463515846",
                                                              "content": "TWO",
                                                              "comments": []
                                                          }
                                                      ]
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "167046246239920276",
                              "content": "Comment 2",
                              "comments": [
                                  {
                                      "id": "1670320642342",
                                      "content": "Yeah, I know!",
                                      "comments": [
                                          {
                                              "id": "167001356516283130183",
                                              "content": "You should've know better!",
                                              "comments": []
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "167046246239920276",
                              "content": "Comment 3",
                              "comments": [
                                  {
                                      "id": "1670320642342",
                                      "content": "Yeah, I know!",
                                      "comments": [
                                          {
                                              "id": "167001356516283130183",
                                              "content": "You should've know better!",
                                              "comments": []
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "title": "Build UI for search",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000002",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Search page",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": [
                          {
                              "id": "65234015823542",
                              "content": "Comment 1",
                              "comments": [
                                  {
                                      "id": "83401538156325162",
                                      "content": "Yeah, I know!",
                                      "comments": [
                                          {
                                              "id": "26+534205324132302324",
                                              "content": "You should've know better!",
                                              "comments": []
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "title": "Build settings UI",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000003",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Account page",
                              "isCompleted": false
                          },
                          {
                              "title": "Billing page",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": [
                          {
                              "id": "0531565315332023452",
                              "content": "Comment 1",
                              "comments": [
                                  {
                                      "id": "5620359+231053235325",
                                      "content": "Yeah, I know!",
                                      "comments": [
                                          {
                                              "id": "093824563153213415",
                                              "content": "You should've know better!",
                                              "comments": []
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "title": "QA and test all major user journeys",
                      "description": "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
                      "status": "Queue",
                      "id": "T-000004",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Internal testing",
                              "isCompleted": false
                          },
                          {
                              "title": "External testing",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  }
              ]
          },
          {
              "name": "Development",
              "tasks": [
                  {
                      "title": "Design settings and search pages",
                      "description": "",
                      "status": "Development",
                      "id": "T-000005",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Settings - Account page",
                              "isCompleted": true
                          },
                          {
                              "title": "Settings - Billing page",
                              "isCompleted": true
                          },
                          {
                              "title": "Search page",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Add account management endpoints",
                      "description": "",
                      "status": "Development",
                      "id": "T-000006",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Upgrade plan",
                              "isCompleted": true
                          },
                          {
                              "title": "Cancel plan",
                              "isCompleted": true
                          },
                          {
                              "title": "Update payment method",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Design onboarding flow",
                      "description": "",
                      "status": "Development",
                      "id": "T-000007",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Sign up page",
                              "isCompleted": true
                          },
                          {
                              "title": "Sign in page",
                              "isCompleted": false
                          },
                          {
                              "title": "Welcome page",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Add search enpoints",
                      "description": "",
                      "status": "Development",
                      "id": "T-000008",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Add search endpoint",
                              "isCompleted": true
                          },
                          {
                              "title": "Define search filters",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Add authentication endpoints",
                      "description": "",
                      "status": "Development",
                      "id": "T-000009",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Define user model",
                              "isCompleted": true
                          },
                          {
                              "title": "Add auth endpoints",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Research pricing points of various competitors and trial different business models",
                      "description": "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                      "status": "Development",
                      "id": "T-000010",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Research competitor pricing and business models",
                              "isCompleted": true
                          },
                          {
                              "title": "Outline a business model that works for our solution",
                              "isCompleted": false
                          },
                          {
                              "title": "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  }
              ]
          },
          {
              "name": "Done",
              "tasks": [
                  {
                      "title": "Conduct 5 wireframe tests",
                      "description": "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
                      "status": "Done",
                      "id": "T-000011",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Complete 5 wireframe prototype tests",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Create wireframe prototype",
                      "description": "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
                      "status": "Done",
                      "id": "T-000012",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Create clickable wireframe prototype in Balsamiq",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Review results of usability tests and iterate",
                      "description": "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
                      "status": "Done",
                      "id": "T-000013",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Meet to review notes from previous tests and plan changes",
                              "isCompleted": true
                          },
                          {
                              "title": "Make changes to paper prototypes",
                              "isCompleted": true
                          },
                          {
                              "title": "Conduct 5 usability tests",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Create paper prototypes and conduct 10 usability tests with potential customers",
                      "description": "",
                      "status": "Done",
                      "id": "T-000014",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Create paper prototypes for version one",
                              "isCompleted": true
                          },
                          {
                              "title": "Complete 10 usability tests",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Market discovery",
                      "description": "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
                      "status": "Done",
                      "id": "T-000015",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Interview 10 prospective customers",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Competitor analysis",
                      "description": "",
                      "status": "Done",
                      "id": "T-000016",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Find direct and indirect competitors",
                              "isCompleted": true
                          },
                          {
                              "title": "SWOT analysis for each competitor",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Research the market",
                      "description": "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
                      "status": "Done",
                      "id": "T-000017",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Write up research analysis",
                              "isCompleted": true
                          },
                          {
                              "title": "Calculate TAM",
                              "isCompleted": true
                          }
                      ],
                      "files": [],
                      "comments": []
                  }
              ]
          }
      ]
  },
  {
      "name": "Marketing Plan",
      "columns": [
          {
              "name": "Queue",
              "tasks": [
                  {
                      "title": "Plan Product Hunt launch",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000018",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Find hunter",
                              "isCompleted": false
                          },
                          {
                              "title": "Gather assets",
                              "isCompleted": false
                          },
                          {
                              "title": "Draft product page",
                              "isCompleted": false
                          },
                          {
                              "title": "Notify customers",
                              "isCompleted": false
                          },
                          {
                              "title": "Notify network",
                              "isCompleted": false
                          },
                          {
                              "title": "Launch!",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Share on Show HN",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000019",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Draft out HN post",
                              "isCompleted": false
                          },
                          {
                              "title": "Get feedback and refine",
                              "isCompleted": false
                          },
                          {
                              "title": "Publish post",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Write launch article to publish on multiple channels",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000020",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Write article",
                              "isCompleted": false
                          },
                          {
                              "title": "Publish on LinkedIn",
                              "isCompleted": false
                          },
                          {
                              "title": "Publish on Inndie Hackers",
                              "isCompleted": false
                          },
                          {
                              "title": "Publish on Medium",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  }
              ]
          },
          {
              "name": "Development",
              "tasks": []
          },
          {
              "name": "Done",
              "tasks": []
          }
      ]
  },
  {
      "name": "Roadmap",
      "columns": [
          {
              "name": "Queue",
              "tasks": [
                  {
                      "title": "Launch version one",
                      "description": "",
                      "status": "Queue",
                      "id": "T-000021",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Launch privately to our waitlist",
                              "isCompleted": false
                          },
                          {
                              "title": "Launch publicly on PH, HN, etc.",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  },
                  {
                      "title": "Review early feedback and plan next steps for roadmap",
                      "description": "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
                      "status": "Queue",
                      "id": "T-000022",
                      "createdAt": "2022-12-05T09:13:32.137Z",
                      "subtasks": [
                          {
                              "title": "Interview 10 customers",
                              "isCompleted": false
                          },
                          {
                              "title": "Review common customer pain points and suggestions",
                              "isCompleted": false
                          },
                          {
                              "title": "Outline next steps for our roadmap",
                              "isCompleted": false
                          }
                      ],
                      "files": [],
                      "comments": []
                  }
              ]
          },
          {
              "name": "Development",
              "tasks": []
          },
          {
              "name": "Done",
              "tasks": []
          }
      ]
  }
]

export const allBoardsReducer = (allBoards = initialState, action) => {
  switch (action.type) {
    //
    case "allBoards/addTask": {
      const [newTask, { boardName, columnName }] = action.payload;
      const { id, status } = newTask;
      const { boardIndex, columnIndex } = getTaskIndexes(allBoards, {
        id,
        status,
        boardName,
        columnName,
      });
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks,
                {
                  ...newTask,
                },
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //
    case "allBoards/deleteTask": {
      const [newTask, { boardName, columnName }] = action.payload;
      const { id, status } = newTask;
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        {
          id,
          status,
          boardName,
          columnName,
        },
        actionEnums.delete
      );
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  0,
                  taskIndex
                ),
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  taskIndex + 1
                ),
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //
    case "allBoards/editTask": {
      const [newTask, { boardName, columnName }] = action.payload;
      const { id, status } = newTask;
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        {
          id,
          status,
          boardName,
          columnName,
        },
        actionEnums.edit
      );
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  0,
                  taskIndex
                ),
                {
                  ...allBoards[boardIndex].columns[columnIndex].tasks[
                    taskIndex
                  ],
                  ...newTask,
                },
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  taskIndex + 1
                ),
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //

    // case "allBoards/addComment": {
    //   const [
    //     parentsArray,
    //     { newCommentContent, status, id, boardName, columnName },
    //   ] = action.payload;
    //   const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
    //     allBoards,
    //     { status, id, boardName, columnName },
    //     actionEnums.edit
    //   );

    //   return [
    //     ...allBoards.slice(0, boardIndex),
    //     {
    //       ...allBoards[boardIndex],
    //       columns: [
    //         ...allBoards[boardIndex].columns.slice(0, columnIndex),
    //         {
    //           ...allBoards[boardIndex].columns[columnIndex],
    //           tasks: [
    //             ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
    //               0,
    //               taskIndex
    //             ),
    //             {
    //               ...allBoards[boardIndex].columns[columnIndex].tasks[
    //                 taskIndex
    //               ],
    //               comments:
    //                 // action.payload.reduce((commentAccum, currentComment, currentIndex) => {
    //                 //   for (let i = 0; i <= currentIndex; i++) {
    //                 //     const commentIndex = commentAccum.findIndex(comment => comment.id === currentComment);
    //                 //     return [...commentAccum[commentIndex].slice(0, )]
    //                 //   }
    //                 //   return {...allBoards[boardIndex].columns[columnIndex].tasks[taskIndex].comments[currentComment]}
    //                 // }, allBoards[boardIndex].columns[columnIndex].tasks[taskIndex].comments)
    //                 getCommentsRecursion(
    //                   allBoards[boardIndex].columns[columnIndex].tasks[
    //                     taskIndex
    //                   ].comments,
    //                   parentsArray,
    //                   newCommentContent
    //                 ),
    //             },
    //             ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
    //               taskIndex + 1
    //             ),
    //           ],
    //         },
    //         ...allBoards[boardIndex].columns.slice(columnIndex + 1),
    //       ],
    //     },
    //     ...allBoards.slice(boardIndex + 1),
    //   ];
    // }

    //

    case "allBoards/addComment": {
      const [newCommentContent, status, id, boardName, columnName] =
        action.payload;
      const { boardIndex, columnIndex, taskIndex } = getTaskIndexes(
        allBoards,
        { status, id, boardName, columnName },
        actionEnums.edit
      );

      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          columns: [
            ...allBoards[boardIndex].columns.slice(0, columnIndex),
            {
              ...allBoards[boardIndex].columns[columnIndex],
              tasks: [
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  0,
                  taskIndex
                ),
                {
                  ...allBoards[boardIndex].columns[columnIndex].tasks[
                    taskIndex
                  ],
                  comments: [
                    ...allBoards[boardIndex].columns[columnIndex].tasks[
                      taskIndex
                    ].comments,
                    newCommentContent
                  ]
                },
                ...allBoards[boardIndex].columns[columnIndex].tasks.slice(
                  taskIndex + 1
                ),
              ],
            },
            ...allBoards[boardIndex].columns.slice(columnIndex + 1),
          ],
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //

    case "allBoards/addBoard": {
      return [...allBoards, action.payload];
    }

    //

    case "allBoards/editBoard": {
      const { boardName, oldBoardName } = action.payload;
      const boardIndex = getBoardIndex(allBoards, oldBoardName);
      return [
        ...allBoards.slice(0, boardIndex),
        {
          ...allBoards[boardIndex],
          name: boardName,
        },
        ...allBoards.slice(boardIndex + 1),
      ];
    }

    //

    case "allBoards/deleteBoard": {
      const { boardName } = action.payload;
      return allBoards.filter((board) => board.name !== boardName);
    }

    default:
      return allBoards;
  }
};

// action creators

export const editTask = (payload) => {
  return {
    type: "allBoards/editTask",
    payload: payload,
  };
};

export const deleteTask = (payload) => {
  return {
    type: "allBoards/deleteTask",
    payload: payload,
  };
};

export const addTask = (payload) => {
  return {
    type: "allBoards/addTask",
    payload: payload,
  };
};

export const addBoard = (payload) => {
  return {
    type: "allBoards/addBoard",
    payload: payload,
  };
};

export const editBoard = (payload) => {
  return {
    type: "allBoards/editBoard",
    payload: payload,
  };
};

export const deleteBoard = (payload) => {
  return {
    type: "allBoards/deleteBoard",
    payload: payload,
  };
};

export const addComment = (payload) => {
  return {
    type: "allBoards/addComment",
    payload: payload,
  };
};

// selectors

export const selectAllBoards = (state) => state.allBoards;

export const selectAllTasks = (state) =>
  state.allBoards.reduce((boardsAccum, currentBoard) => {
    return boardsAccum.concat(
      currentBoard.columns.reduce((columnsAccum, currentColumn) => {
        return Array.from(columnsAccum).concat(
          currentColumn.tasks.reduce((tasksAccum, currentTask) => {
            return Array.from(tasksAccum).concat(currentTask);
          }, [])
        );
      }, [])
    );
  }, []);
