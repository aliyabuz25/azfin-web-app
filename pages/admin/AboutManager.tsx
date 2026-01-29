
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/Layout';
import ImageUpload from '../../components/admin/ImageUpload';
import { useData } from '../../context/DataContext';
import { Check, Info, Users, MessageSquare, Building2, Plus, Trash2 } from 'lucide-react';

const AboutManager: React.FC = () => {
    const { aboutData, updateAboutData } = useData();
    const [formData, setFormData] = useState(aboutData);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setFormData(aboutData);
    }, [aboutData]);

    const handleSave = () => {
        updateAboutData(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const addTeamMember = () => {
        setFormData({
            ...formData,
            team: [...formData.team, { id: Date.now().toString(), name: '', role: '', img: '' }]
        });
    };

    const updateTeamMember = (id: string, field: string, value: string) => {
        setFormData({
            ...formData,
            team: formData.team.map((m: any) => m.id === id ? { ...m, [field]: value } : m)
        });
    };

    const deleteTeamMember = (id: string) => {
        setFormData({
            ...formData,
            team: formData.team.filter((m: any) => m.id !== id)
        });
    };

    const addTestimonial = () => {
        setFormData({
            ...formData,
            testimonials: [...formData.testimonials, { id: Date.now().toString(), name: '', company: '', text: '' }]
        });
    };

    const updateTestimonial = (id: string, field: string, value: string) => {
        setFormData({
            ...formData,
            testimonials: formData.testimonials.map((t: any) => t.id === id ? { ...t, [field]: value } : t)
        });
    };

    const deleteTestimonial = (id: string) => {
        setFormData({
            ...formData,
            testimonials: formData.testimonials.filter((t: any) => t.id !== id)
        });
    };

    return (
        <AdminLayout
            title="Haqqımızda"
            actions={
                <button onClick={handleSave} className="btn btn-success btn-sm">
                    <i className="fas fa-check mr-1"></i> {success ? 'Yadda Saxlanıldı' : 'Yadda Saxla'}
                </button>
            }
        >
            <div className="row pb-5">
                <div className="col-md-12">
                    {/* General Info */}
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">
                                <i className="fas fa-building mr-2"></i>
                                Ümumi Məlumat
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <ImageUpload
                                        value={formData.image}
                                        onChange={url => setFormData({ ...formData, image: url })}
                                        label="Əsas Şəkil"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Başlıq</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Qısa Təsvir (Vurğulanan)</label>
                                        <textarea
                                            rows={2}
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tam Məzmun</label>
                                        <textarea
                                            rows={4}
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Missiyamız</h3>
                        </div>
                        <div className="card-body">
                            <textarea
                                rows={3}
                                value={formData.mission}
                                onChange={e => setFormData({ ...formData, mission: e.target.value })}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Xidmət Sahələrimiz</h3>
                        </div>
                        <div className="card-body">
                            <textarea
                                rows={3}
                                value={formData.scope}
                                onChange={e => setFormData({ ...formData, scope: e.target.value })}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                {/* Team Management */}
                <div className="col-md-12 mt-4">
                    <div className="card card-purple card-outline">
                        <div className="card-header d-flex align-items-center">
                            <h3 className="card-title mr-auto">
                                <i className="fas fa-users mr-2"></i>
                                Əməkdaşlarımız
                            </h3>
                            <button onClick={addTeamMember} className="btn btn-primary btn-xs">
                                <i className="fas fa-plus mr-1"></i> Əlavə Et
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {formData.team.map((member: any) => (
                                    <div key={member.id} className="col-md-4 mb-4">
                                        <div className="card card-widget widget-user-2 shadow-sm border">
                                            <button onClick={() => deleteTeamMember(member.id)} className="btn btn-tool position-absolute" style={{ right: '5px', top: '5px', zIndex: 10 }}>
                                                <i className="fas fa-times text-danger"></i>
                                            </button>
                                            <div className="widget-user-header bg-light">
                                                <div className="text-center mb-2">
                                                    <img src={member.img || 'https://via.placeholder.com/100'} alt={member.name} className="img-circle elevation-2" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                </div>
                                                <div className="form-group mb-1">
                                                    <input
                                                        type="text"
                                                        value={member.name}
                                                        placeholder="Ad Soyad"
                                                        onChange={e => updateTeamMember(member.id, 'name', e.target.value)}
                                                        className="form-control form-control-sm text-center font-weight-bold"
                                                    />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <input
                                                        type="text"
                                                        value={member.role}
                                                        placeholder="Vəzifə"
                                                        onChange={e => updateTeamMember(member.id, 'role', e.target.value)}
                                                        className="form-control form-control-sm text-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-footer p-2">
                                                <ImageUpload
                                                    value={member.img}
                                                    onChange={url => updateTeamMember(member.id, 'img', url)}
                                                    label="Şəkil Yenilə"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Management */}
                <div className="col-md-12 mt-4">
                    <div className="card card-success card-outline">
                        <div className="card-header d-flex align-items-center">
                            <h3 className="card-title mr-auto">
                                <i className="fas fa-comments mr-2"></i>
                                Müştəri Rəyləri
                            </h3>
                            <button onClick={addTestimonial} className="btn btn-primary btn-xs">
                                <i className="fas fa-plus mr-1"></i> Əlavə Et
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {formData.testimonials.map((testimonial: any) => (
                                    <div key={testimonial.id} className="col-md-6 mb-3">
                                        <div className="card shadow-sm border">
                                            <div className="card-header p-2 d-flex align-items-center">
                                                <span className="badge badge-info mr-auto">Rəy #{testimonial.id.slice(-4)}</span>
                                                <button onClick={() => deleteTestimonial(testimonial.id)} className="btn btn-tool">
                                                    <i className="fas fa-trash text-danger"></i>
                                                </button>
                                            </div>
                                            <div className="card-body p-3">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <input
                                                            type="text"
                                                            value={testimonial.name}
                                                            placeholder="Ad Soyad"
                                                            onChange={e => updateTestimonial(testimonial.id, 'name', e.target.value)}
                                                            className="form-control form-control-sm"
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <input
                                                            type="text"
                                                            value={testimonial.company}
                                                            placeholder="Şirkət"
                                                            onChange={e => updateTestimonial(testimonial.id, 'company', e.target.value)}
                                                            className="form-control form-control-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <textarea
                                                        rows={2}
                                                        value={testimonial.text}
                                                        placeholder="Rəy mətni..."
                                                        onChange={e => updateTestimonial(testimonial.id, 'text', e.target.value)}
                                                        className="form-control form-control-sm italic"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AboutManager;
