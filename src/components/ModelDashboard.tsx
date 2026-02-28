'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  User,
  Settings,
  Image,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Upload,
  Trash2,
  Plus,
  Star,
  MapPin,
  Ruler,
  Instagram,
  Twitter,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

// PhotoUpload component stub — archivo original eliminado
function PhotoUpload({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return null;
}

interface Photo {
  id: string;
  url: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isProfilePhoto: boolean;
  category: string;
  title: string | null;
  rejectionReason: string | null;
}

interface ProfileData {
  artisticName: string;
  bio: string;
  location: string;
  nationality: string;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  measurements: string;
  shoeSize: string;
  hobbies: string;
  languages: string;
  skills: string;
  experience: string;
  specialties: string;
  availability: string;
  instagram: string;
  twitter: string;
  tiktok: string;
}

export default function ModelDashboard() {
  const { user, profile, setProfile } = useAuthStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    artisticName: '',
    bio: '',
    location: '',
    nationality: '',
    height: '',
    weight: '',
    eyeColor: '',
    hairColor: '',
    measurements: '',
    shoeSize: '',
    hobbies: '',
    languages: '',
    skills: '',
    experience: '',
    specialties: '',
    availability: '',
    instagram: '',
    twitter: '',
    tiktok: '',
  });

  useEffect(() => {
    fetchProfile();
    fetchPhotos();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profiles/me');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setProfileData({
          artisticName: data.artisticName || '',
          bio: data.bio || '',
          location: data.location || '',
          nationality: data.nationality || '',
          height: data.height?.toString() || '',
          weight: data.weight?.toString() || '',
          eyeColor: data.eyeColor || '',
          hairColor: data.hairColor || '',
          measurements: data.measurements || '',
          shoeSize: data.shoeSize?.toString() || '',
          hobbies: data.hobbies || '',
          languages: data.languages || '',
          skills: data.skills || '',
          experience: data.experience || '',
          specialties: data.specialties || '',
          availability: data.availability || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          tiktok: data.tiktok || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos/my-photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profiles/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileData,
          height: profileData.height ? parseFloat(profileData.height) : null,
          weight: profileData.weight ? parseFloat(profileData.weight) : null,
          shoeSize: profileData.shoeSize ? parseFloat(profileData.shoeSize) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to save profile');

      const data = await response.json();
      setProfile(data);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete photo');

      setPhotos(photos.filter((p) => p.id !== photoId));
      toast({
        title: 'Photo Deleted',
        description: 'The photo has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete photo',
        variant: 'destructive',
      });
    }
  };

  const handleSetProfilePhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isProfilePhoto: true }),
      });

      if (!response.ok) throw new Error('Failed to set profile photo');

      setPhotos(
        photos.map((p) => ({
          ...p,
          isProfilePhoto: p.id === photoId,
        }))
      );
      toast({
        title: 'Profile Photo Updated',
        description: 'Your profile photo has been changed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set profile photo',
        variant: 'destructive',
      });
    }
  };

  const stats = [
    { label: 'Profile Views', value: profile?.views || 0, icon: Eye },
    { label: 'Photos', value: photos.length, icon: Image },
    { label: 'Approved', value: photos.filter((p) => p.status === 'APPROVED').length, icon: CheckCircle },
    { label: 'Pending', value: photos.filter((p) => p.status === 'PENDING').length, icon: Clock },
  ];

  return (
    <section className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-serif text-3xl font-bold text-white mb-2">
              Model Dashboard
            </h1>
            <p className="text-gray-400">
              Manage your profile, photos, and bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={profile?.status === 'APPROVED' ? 'default' : 'secondary'}
              className={`${profile?.status === 'APPROVED'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : profile?.status === 'PENDING'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
            >
              {profile?.status === 'APPROVED' ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : profile?.status === 'PENDING' ? (
                <Clock className="w-3 h-3 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              {profile?.status || 'No Profile'}
            </Badge>
            {profile?.featured && (
              <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-[#D4AF37]/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/5 border border-[#D4AF37]/20 mb-6">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              Photos
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Preview */}
              <Card className="bg-white/5 border-[#D4AF37]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#D4AF37]" />
                    Profile Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                      <img
                        src={
                          photos.find((p) => p.isProfilePhoto)?.url ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {profileData.artisticName || user?.name || 'Your Name'}
                      </h3>
                      {profileData.location && (
                        <p className="text-gray-400 flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          {profileData.location}
                        </p>
                      )}
                    </div>
                  </div>
                  {profileData.bio && (
                    <p className="text-gray-400 text-sm mb-4">{profileData.bio}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {profileData.height && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Ruler className="w-4 h-4 text-[#D4AF37]" />
                        {profileData.height} cm
                      </div>
                    )}
                    {profileData.instagram && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Instagram className="w-4 h-4 text-[#D4AF37]" />
                        {profileData.instagram}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Photos */}
              <Card className="bg-white/5 border-[#D4AF37]/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Image className="w-5 h-5 text-[#D4AF37]" />
                    Recent Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {photos.slice(0, 6).map((photo) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={photo.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`absolute top-1 right-1 w-2 h-2 rounded-full ${photo.status === 'APPROVED'
                              ? 'bg-green-500'
                              : photo.status === 'PENDING'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                        />
                      </div>
                    ))}
                    {photos.length === 0 && (
                      <div className="col-span-3 text-center py-8 text-gray-500">
                        No photos yet
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => setActiveTab('photos')}
                    variant="outline"
                    className="w-full mt-4 border-[#D4AF37]/50 text-[#D4AF37]"
                  >
                    Manage Photos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Edit Tab */}
          <TabsContent value="profile">
            <Card className="bg-white/5 border-[#D4AF37]/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold mb-4">
                      Personal Information
                    </h3>
                    <div>
                      <Label className="text-gray-400">Artistic Name</Label>
                      <Input
                        value={profileData.artisticName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            artisticName: e.target.value,
                          })
                        }
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Bio</Label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({ ...profileData, bio: e.target.value })
                        }
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Location</Label>
                      <Input
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Nationality</Label>
                      <Input
                        value={profileData.nationality}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            nationality: e.target.value,
                          })
                        }
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                  </div>

                  {/* Physical Stats */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold mb-4">
                      Physical Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Height (cm)</Label>
                        <Input
                          type="number"
                          value={profileData.height}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              height: e.target.value,
                            })
                          }
                          className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400">Weight (kg)</Label>
                        <Input
                          type="number"
                          value={profileData.weight}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              weight: e.target.value,
                            })
                          }
                          className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Eye Color</Label>
                        <Input
                          value={profileData.eyeColor}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              eyeColor: e.target.value,
                            })
                          }
                          className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400">Hair Color</Label>
                        <Input
                          value={profileData.hairColor}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              hairColor: e.target.value,
                            })
                          }
                          className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-400">Measurements</Label>
                      <Input
                        value={profileData.measurements}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            measurements: e.target.value,
                          })
                        }
                        placeholder="e.g., 90-60-90"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Shoe Size</Label>
                      <Input
                        value={profileData.shoeSize}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            shoeSize: e.target.value,
                          })
                        }
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold mb-4">
                      Professional Information
                    </h3>
                    <div>
                      <Label className="text-gray-400">Experience</Label>
                      <Input
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            experience: e.target.value,
                          })
                        }
                        placeholder="e.g., 5 years"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">
                        Specialties (comma-separated)
                      </Label>
                      <Input
                        value={profileData.specialties}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            specialties: e.target.value,
                          })
                        }
                        placeholder="Fashion, Editorial, Commercial"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Availability</Label>
                      <Input
                        value={profileData.availability}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            availability: e.target.value,
                          })
                        }
                        placeholder="e.g., Full-time, Weekends"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold mb-4">
                      Social Media
                    </h3>
                    <div>
                      <Label className="text-gray-400">Instagram</Label>
                      <Input
                        value={profileData.instagram}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            instagram: e.target.value,
                          })
                        }
                        placeholder="@username"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Twitter</Label>
                      <Input
                        value={profileData.twitter}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            twitter: e.target.value,
                          })
                        }
                        placeholder="@username"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">TikTok</Label>
                      <Input
                        value={profileData.tiktok}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            tiktok: e.target.value,
                          })
                        }
                        placeholder="@username"
                        className="bg-white/5 border-[#D4AF37]/30 text-white mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Edit className="w-4 h-4 mr-2" />
                    )}
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <Card className="bg-white/5 border-[#D4AF37]/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Your Photos</CardTitle>
                  <Button
                    onClick={() => setShowPhotoUpload(true)}
                    className="bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={photo.url}
                          alt={photo.title || 'Photo'}
                          className="w-full h-full object-cover"
                        />
                        {/* Status Indicator */}
                        <div
                          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${photo.status === 'APPROVED'
                              ? 'bg-green-500/80 text-white'
                              : photo.status === 'PENDING'
                                ? 'bg-yellow-500/80 text-black'
                                : 'bg-red-500/80 text-white'
                            }`}
                        >
                          {photo.status}
                        </div>
                        {/* Profile Photo Badge */}
                        {photo.isProfilePhoto && (
                          <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium bg-[#D4AF37] text-black">
                            Profile
                          </div>
                        )}
                        {/* Actions Overlay */}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {!photo.isProfilePhoto && photo.status === 'APPROVED' && (
                            <Button
                              size="sm"
                              onClick={() => handleSetProfilePhoto(photo.id)}
                              className="bg-[#D4AF37] text-black"
                            >
                              Set as Profile
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePhoto(photo.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {photo.rejectionReason && (
                          <div className="absolute bottom-0 left-0 right-0 bg-red-500/80 text-white text-xs p-2">
                            {photo.rejectionReason}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No photos uploaded yet</p>
                    <Button
                      onClick={() => setShowPhotoUpload(true)}
                      variant="outline"
                      className="mt-4 border-[#D4AF37] text-[#D4AF37]"
                    >
                      Upload Your First Photo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Photo Upload Modal */}
        <PhotoUpload
          isOpen={showPhotoUpload}
          onClose={() => {
            setShowPhotoUpload(false);
            fetchPhotos();
          }}
        />
      </div>
    </section>
  );
}
