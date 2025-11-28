import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  fetchSchoolNetwork,
  createChildProfile,
  updateChildProfile,   // 🆕
  deleteChildProfile,   // 🆕
} from "../api/client";

export default function SchoolNetwork() {
  const user = getCurrentUser();

  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  const [childForm, setChildForm] = useState({
    name: "",
    grade: "",
    photoUrl: "",
  });
  const [savingChild, setSavingChild] = useState(false);


  const [editingChildId, setEditingChildId] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchSchoolNetwork();
        
        setFamilies(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Could not load school network.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (!user) {
    
    return null;
  }

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const resetChildForm = () => {
    setChildForm({
      name: "",
      grade: "",
      photoUrl: "",
    });
    setEditingChildId(null);
  };

  const handleChildSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSavingChild(true);

    if (!childForm.name.trim() || !childForm.grade.trim()) {
      setError("Please enter your child’s name and grade.");
      setSavingChild(false);
      return;
    }

    try {
      const payload = {
        name: childForm.name.trim(),
        grade: childForm.grade.trim(),
        photoUrl: childForm.photoUrl.trim(), 
      };

      if (editingChildId) {
       
        const updatedChild = await updateChildProfile(editingChildId, payload);
        const finalChild = updatedChild.child || updatedChild;

        setFamilies((prev) =>
          prev.map((fam) => {
            if (fam.email !== user.email) return fam;
            const children = Array.isArray(fam.children) ? fam.children : [];
            return {
              ...fam,
              children: children.map((c) =>
                c._id === editingChildId ? finalChild : c
              ),
            };
          })
        );
      } else {
        
        const newChild = await createChildProfile(payload);

        
        setFamilies((prev) =>
          prev.map((fam) => {
            if (fam.email === user.email) {
              const children = Array.isArray(fam.children) ? fam.children : [];
              return {
                ...fam,
                children: [...children, newChild],
              };
            }
            return fam;
          })
        );
      }

      
      resetChildForm();
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save child profile.");
    } finally {
      setSavingChild(false);
    }
  };

  // 🆕 Click "Edit" on a child
  const handleEditChildClick = (child) => {
    setEditingChildId(child._id);
    setChildForm({
      name: child.name || "",
      grade: child.grade || "",
      photoUrl: child.photoUrl || "",
    });
  };


  const handleDeleteChild = async (childId) => {
    if (!window.confirm("Are you sure you want to delete this child profile?")) {
      return;
    }

    try {
      await deleteChildProfile(childId);

      setFamilies((prev) =>
        prev.map((fam) => {
          if (fam.email !== user.email) return fam;
          const children = Array.isArray(fam.children) ? fam.children : [];
          return {
            ...fam,
            children: children.filter((c) => c._id !== childId),
          };
        })
      );

      
      if (editingChildId === childId) {
        resetChildForm();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not delete child profile.");
    }
  };

  if (loading) {
    return (
      <section
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <h3>School Connections</h3>
        <p>Loading families at your school...</p>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <h3>School Connections</h3>
      <p style={{ fontSize: 13, color: "#666" }}>
        These are families who share your school code ({user.schoolCode}). Each family
        can create profiles for their children so other parents can recognize them.
      </p>

      {error && (
        <div
          style={{
            background: "#ffe0e0",
            color: "#b30000",
            padding: "8px 10px",
            borderRadius: 6,
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          {error}
        </div>
      )}

      {/* Child profile form for the current family */}
      <div
        style={{
          marginTop: 8,
          marginBottom: 16,
          padding: 10,
          borderRadius: 8,
          background: "#f8fdf8",
          border: "1px solid #e0f3e0",
        }}
      >
        <h4 style={{ margin: "0 0 6px" }}>
          {editingChildId ? "Edit child profile" : "Add a child profile (your family)"}
        </h4>
        <form onSubmit={handleChildSubmit} style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={labelStyle}>Child’s Name</label>
              <input
                name="name"
                value={childForm.name}
                onChange={handleChildChange}
                style={inputStyle}
                placeholder="e.g. Daphne"
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Grade</label>
              <input
                name="grade"
                value={childForm.grade}
                onChange={handleChildChange}
                style={inputStyle}
                placeholder="e.g. 3rd grade"
                required
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Photo URL</label>
            <input
              name="photoUrl"
              value={childForm.photoUrl}
              onChange={handleChildChange}
              style={inputStyle}
              placeholder="Paste an image link (for now)"
            />
            <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>
              (Later you can upgrade this to real image uploads. For now, a web image URL
              or hosted link works.)
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button
              type="submit"
              disabled={savingChild}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                background: "#fb9dd0ff",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {savingChild
                ? editingChildId
                  ? "Saving changes..."
                  : "Saving..."
                : editingChildId
                ? "Save Changes"
                : "Save Child Profile"}
            </button>

            {editingChildId && (
              <button
                type="button"
                onClick={resetChildForm}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  background: "#fff",
                  color: "#333",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Families & children grid */}
      {families.length === 0 ? (
        <p style={{ fontSize: 13 }}>
          No other families found for this school code yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {families.map((fam) => {
            const children = Array.isArray(fam.children) ? fam.children : [];
            const isCurrentFamily = fam.email === user.email;

            return (
              <div
                key={fam._id || fam.email}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 10,
                  fontSize: 13,
                  background: "#fafafa",
                }}
              >
                <div style={{ marginBottom: 6 }}>
                  <strong>{fam.familyName || "Family"}</strong>
                  <div style={{ color: "#666" }}>{fam.email}</div>
                  {isCurrentFamily && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#fb9dd0ff",
                        marginTop: 2,
                      }}
                    >
                      (Your family)
                    </div>
                  )}
                </div>

                {children.length === 0 ? (
                  <div style={{ fontSize: 12, color: "#999" }}>
                    No child profiles yet.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                      gap: 8,
                    }}
                  >
                    {children.map((child) => (
                      <div
                        key={child._id || child.name + child.grade}
                        style={{
                          background: "#fff",
                          borderRadius: 8,
                          padding: 6,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                          textAlign: "center",
                        }}
                      >
                        {child.photoUrl ? (
                          <img
                            src={child.photoUrl}
                            alt={child.name}
                            style={{
                              width: "100%",
                              height: 70,
                              objectFit: "cover",
                              borderRadius: 6,
                              marginBottom: 4,
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: 70,
                              borderRadius: 6,
                              background: "#eaeaea",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 4,
                              fontSize: 11,
                              color: "#777",
                            }}
                          >
                            No photo
                          </div>
                        )}
                        <div style={{ fontWeight: "bold", fontSize: 12 }}>
                          {child.name}
                        </div>
                        <div style={{ fontSize: 11, color: "#555" }}>
                          {child.grade}
                        </div>

                        {/* 🆕 Only show edit/delete for THIS parent's kids */}
                        {isCurrentFamily && child._id && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 4,
                              marginTop: 4,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => handleEditChildClick(child)}
                              style={{
                                border: "none",
                                background: "#eee",
                                borderRadius: 4,
                                padding: "2px 6px",
                                fontSize: 11,
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteChild(child._id)}
                              style={{
                                border: "none",
                                background: "#ffdddd",
                                color: "#b30000",
                                borderRadius: 4,
                                padding: "2px 6px",
                                fontSize: 11,
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: "bold",
  marginBottom: 2,
};

const inputStyle = {
  width: "100%",
  padding: 6,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 13,
  boxSizing: "border-box",
};
